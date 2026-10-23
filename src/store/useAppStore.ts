'use client';

import { create } from 'zustand';
import { db, CompletedItemRecord, InterferenceErrorLog } from '@/lib/db';
import { createInitialSrsCard, scheduleNextReview, SrsCardState, SrsRating } from '@/lib/srs';
import { MODULE_A0_01 } from '@/content/modules/mod-a0-01';
import { InterferenceTag } from '@/types/curriculum';

export type ActiveView =
  | { mode: 'dashboard' }
  | { mode: 'lesson'; lessonId: string }
  | { mode: 'quest' }
  | { mode: 'final_test' }
  | { mode: 'srs_session' }
  | { mode: 'vocabulary_list' };

interface AppState {
  isHydrated: boolean;
  activeView: ActiveView;
  completedItems: Record<string, CompletedItemRecord>;
  srsCards: Record<string, SrsCardState>;
  interferenceLogs: InterferenceErrorLog[];
  streakDays: number;
  totalExercisesSolved: number;
  correctFirstTryCount: number;

  hydrateFromDb: () => Promise<void>;
  setView: (view: ActiveView) => void;
  markItemCompleted: (
    itemId: string,
    itemType: 'lesson' | 'quest' | 'test',
    scorePercent: number
  ) => Promise<void>;
  recordAttempt: (isCorrectFirstTry: boolean) => Promise<void>;
  logInterferenceError: (
    tag: InterferenceTag,
    exerciseId: string,
    userInput: string
  ) => Promise<void>;
  reviewSrsCard: (vocabId: string, rating: SrsRating) => Promise<void>;
}

function getTodayIso(): string {
  return new Date().toISOString().slice(0, 10);
}

export const useAppStore = create<AppState>((set, get) => ({
  isHydrated: false,
  activeView: { mode: 'dashboard' },
  completedItems: {},
  srsCards: {},
  interferenceLogs: [],
  streakDays: 1,
  totalExercisesSolved: 0,
  correctFirstTryCount: 0,

  hydrateFromDb: async () => {
    if (!db) return;

    const [completedList, existingCards, logs, meta] = await Promise.all([
      db.completedItems.toArray(),
      db.srsCards.toArray(),
      db.interferenceLogs.orderBy('timestamp').reverse().limit(50).toArray(),
      db.userMeta.get('profile'),
    ]);

    const completedMap: Record<string, CompletedItemRecord> = {};
    for (const item of completedList) {
      completedMap[item.itemId] = item;
    }

    const srsMap: Record<string, SrsCardState> = {};
    for (const card of existingCards) {
      srsMap[card.vocabId] = card;
    }

    // Инициализируем карточки Модуля 1, если их ещё нет в IndexedDB
    const newCardsToInsert: SrsCardState[] = [];
    for (const vocab of MODULE_A0_01.vocabulary) {
      if (!srsMap[vocab.id]) {
        const card = createInitialSrsCard(vocab.id, MODULE_A0_01.id);
        srsMap[vocab.id] = card;
        newCardsToInsert.push(card);
      }
    }
    if (newCardsToInsert.length > 0) {
      await db.srsCards.bulkPut(newCardsToInsert);
    }

    const today = getTodayIso();
    let streakDays = meta?.streakDays ?? 1;
    const totalExercisesSolved = meta?.totalExercisesSolved ?? 0;
    const correctFirstTryCount = meta?.correctFirstTryCount ?? 0;

    if (!meta) {
      await db.userMeta.put({
        key: 'profile',
        streakDays: 1,
        lastActiveDate: today,
        totalExercisesSolved: 0,
        correctFirstTryCount: 0,
      });
    } else if (meta.lastActiveDate !== today) {
      const prevDate = new Date(meta.lastActiveDate);
      const currDate = new Date(today);
      const diffDays = Math.round(
        (currDate.getTime() - prevDate.getTime()) / (1000 * 60 * 60 * 24)
      );
      if (diffDays === 1) {
        streakDays += 1;
      }
      await db.userMeta.put({
        ...meta,
        streakDays,
        lastActiveDate: today,
      });
    }

    set({
      isHydrated: true,
      completedItems: completedMap,
      srsCards: srsMap,
      interferenceLogs: logs,
      streakDays,
      totalExercisesSolved,
      correctFirstTryCount,
    });
  },

  setView: (activeView) => set({ activeView }),

  markItemCompleted: async (itemId, itemType, scorePercent) => {
    const record: CompletedItemRecord = {
      itemId,
      moduleId: MODULE_A0_01.id,
      itemType,
      scorePercent,
      completedAt: Date.now(),
    };

    if (db) {
      await db.completedItems.put(record);
    }

    set((state) => ({
      completedItems: {
        ...state.completedItems,
        [itemId]: record,
      },
    }));
  },

  recordAttempt: async (isCorrectFirstTry) => {
    const state = get();
    const totalExercisesSolved = state.totalExercisesSolved + 1;
    const correctFirstTryCount =
      state.correctFirstTryCount + (isCorrectFirstTry ? 1 : 0);

    set({ totalExercisesSolved, correctFirstTryCount });

    if (db) {
      await db.userMeta.put({
        key: 'profile',
        streakDays: state.streakDays,
        lastActiveDate: getTodayIso(),
        totalExercisesSolved,
        correctFirstTryCount,
      });
    }
  },

  logInterferenceError: async (tag, exerciseId, userInput) => {
    const entry: InterferenceErrorLog = {
      tag,
      exerciseId,
      userInput,
      timestamp: Date.now(),
    };
    if (db) {
      await db.interferenceLogs.add(entry);
    }
    set((state) => ({
      interferenceLogs: [entry, ...state.interferenceLogs].slice(0, 50),
    }));
  },

  reviewSrsCard: async (vocabId, rating) => {
    const current = get().srsCards[vocabId];
    if (!current) return;

    const updated = scheduleNextReview(current, rating);
    if (db) {
      await db.srsCards.put(updated);
    }
    set((state) => ({
      srsCards: {
        ...state.srsCards,
        [vocabId]: updated,
      },
    }));
  },
}));
