'use client';

import { create } from 'zustand';
import {
  db,
  CompletedItemRecord,
  InterferenceErrorLog,
  CustomWordRecord,
  DEFAULT_PROFILE_ID,
} from '@/lib/db';
import { createInitialSrsCard, scheduleNextReview, SrsCardState, SrsRating } from '@/lib/srs';
import {
  NotificationSettings,
  getDefaultNotificationSettings,
  loadNotificationSettings,
  saveNotificationSettings,
  normalizeSettingsForToday,
} from '@/lib/notifications';
import { ALL_MODULES } from '@/content/modules';
import { getAllPackWords } from '@/content/vocab-packs';
import { InterferenceTag } from '@/types/curriculum';
import { UserProfile, NewProfileInput } from '@/types/profile';

export type VocabDrillMode = 'dictation' | 'spelling' | 'context';

export type ActiveView =
  | { mode: 'dashboard' }
  | { mode: 'lesson'; lessonId: string }
  | { mode: 'quest' }
  | { mode: 'final_test' }
  | { mode: 'srs_session'; drillMode?: VocabDrillMode; packId?: string };

interface AppState {
  isHydrated: boolean;
  selectedModuleId: string;
  activeView: ActiveView;

  // Профили пользователей
  profiles: UserProfile[];
  currentProfile: UserProfile | null;
  isProfileModalOpen: boolean;

  completedItems: Record<string, CompletedItemRecord>;
  srsCards: Record<string, SrsCardState>;
  customWords: CustomWordRecord[];
  interferenceLogs: InterferenceErrorLog[];
  streakDays: number;
  totalExercisesSolved: number;
  correctFirstTryCount: number;
  notificationSettings: NotificationSettings;

  hydrateFromDb: () => Promise<void>;
  selectModule: (moduleId: string) => void;
  setView: (view: ActiveView) => void;
  setProfileModalOpen: (isOpen: boolean) => void;
  updateNotificationSettings: (updates: Partial<NotificationSettings>) => void;

  createProfile: (input: NewProfileInput) => Promise<string>;
  switchProfile: (profileId: string) => Promise<void>;
  updateProfile: (profileId: string, updates: Partial<NewProfileInput>) => Promise<void>;
  deleteProfile: (profileId: string) => Promise<void>;

  addCustomWord: (input: {
    pl: string;
    ru: string;
    pronunciationHint?: string;
    examplePl?: string;
    exampleRu?: string;
  }) => Promise<void>;
  deleteCustomWord: (wordId: string) => Promise<void>;

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

const STORAGE_ACTIVE_PROFILE_KEY = 'active_polish_profile_id';

export const useAppStore = create<AppState>((set, get) => ({
  isHydrated: false,
  selectedModuleId: 'mod-a1-01',
  activeView: { mode: 'dashboard' },

  profiles: [],
  currentProfile: null,
  isProfileModalOpen: false,

  completedItems: {},
  srsCards: {},
  customWords: [],
  interferenceLogs: [],
  streakDays: 1,
  totalExercisesSolved: 0,
  correctFirstTryCount: 0,
  notificationSettings: getDefaultNotificationSettings(),

  setProfileModalOpen: (isProfileModalOpen) => set({ isProfileModalOpen }),

  updateNotificationSettings: (updates) => {
    const { currentProfile, notificationSettings } = get();
    const normalized = normalizeSettingsForToday(notificationSettings, getTodayIso());
    const nextSettings: NotificationSettings = {
      ...normalized,
      ...updates,
    };
    if (currentProfile) {
      saveNotificationSettings(currentProfile.id, nextSettings);
    }
    set({ notificationSettings: nextSettings });
  },

  selectModule: (moduleId) =>
    set({ selectedModuleId: moduleId, activeView: { mode: 'dashboard' } }),

  setView: (activeView) => set({ activeView }),

  hydrateFromDb: async () => {
    if (!db) return;

    let profileList = await db.profiles.toArray();

    // Если профилей ещё нет (первый запуск или миграция с v1)
    if (profileList.length === 0) {
      const legacyMeta = await db.userMeta.get('profile');
      const defaultProfile: UserProfile = {
        id: DEFAULT_PROFILE_ID,
        name: 'Ученик',
        avatar: '🦉',
        color: 'indigo',
        createdAt: Date.now(),
        streakDays: legacyMeta?.streakDays ?? 1,
        lastActiveDate: legacyMeta?.lastActiveDate ?? getTodayIso(),
        totalExercisesSolved: legacyMeta?.totalExercisesSolved ?? 0,
        correctFirstTryCount: legacyMeta?.correctFirstTryCount ?? 0,
      };
      await db.profiles.put(defaultProfile);
      profileList = [defaultProfile];
    }

    const savedProfileId =
      typeof window !== 'undefined'
        ? localStorage.getItem(STORAGE_ACTIVE_PROFILE_KEY)
        : null;

    const activeProfile =
      profileList.find((p) => p.id === savedProfileId) || profileList[0];

    set({ profiles: profileList });
    await get().switchProfile(activeProfile.id);
    set({ isHydrated: true });
  },

  createProfile: async (input) => {
    const newProfile: UserProfile = {
      id: `prof-${Date.now()}`,
      name: input.name.trim() || 'Новый ученик',
      avatar: input.avatar || '🧑‍🎓',
      color: input.color || 'indigo',
      createdAt: Date.now(),
      streakDays: 1,
      lastActiveDate: getTodayIso(),
      totalExercisesSolved: 0,
      correctFirstTryCount: 0,
    };

    if (db) {
      await db.profiles.put(newProfile);
    }

    const nextProfiles = [...get().profiles, newProfile];
    set({ profiles: nextProfiles });

    await get().switchProfile(newProfile.id);
    return newProfile.id;
  },

  switchProfile: async (profileId: string) => {
    const { profiles } = get();
    let target = profiles.find((p) => p.id === profileId);
    if (!target) return;

    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_ACTIVE_PROFILE_KEY, target.id);
    }

    const today = getTodayIso();
    let streakDays = target.streakDays;
    if (target.lastActiveDate !== today) {
      const prevDate = new Date(target.lastActiveDate);
      const currDate = new Date(today);
      const diffDays = Math.round(
        (currDate.getTime() - prevDate.getTime()) / (1000 * 60 * 60 * 24)
      );
      if (diffDays === 1) {
        streakDays += 1;
      } else if (diffDays > 1) {
        streakDays = 1;
      }
      target = { ...target, streakDays, lastActiveDate: today };
      if (db) {
        await db.profiles.put(target);
      }
    }

    const completedMap: Record<string, CompletedItemRecord> = {};
    const srsMap: Record<string, SrsCardState> = {};
    let logs: InterferenceErrorLog[] = [];
    let customWordsList: CustomWordRecord[] = [];

    if (db) {
      const [completedList, existingCards, logsList, userWords] = await Promise.all([
        db.completedItems.where('profileId').equals(target.id).toArray(),
        db.srsCards.where('profileId').equals(target.id).toArray(),
        db.interferenceLogs
          .where('profileId')
          .equals(target.id)
          .reverse()
          .limit(50)
          .toArray(),
        db.customWords.where('profileId').equals(target.id).reverse().toArray(),
      ]);

      for (const item of completedList) {
        completedMap[item.itemId] = item;
      }
      for (const card of existingCards) {
        srsMap[card.vocabId] = card;
      }
      logs = logsList;
      customWordsList = userWords;

      // Инициализируем карточки SRS для всех модулей и тематических наборов
      const newCardsToInsert: SrsCardState[] = [];
      for (const mod of ALL_MODULES) {
        for (const vocab of mod.vocabulary) {
          if (!srsMap[vocab.id]) {
            const card = createInitialSrsCard(vocab.id, mod.id, target.id);
            srsMap[vocab.id] = card;
            newCardsToInsert.push(card);
          }
        }
      }
      for (const packWord of getAllPackWords()) {
        if (!srsMap[packWord.id]) {
          const card = createInitialSrsCard(packWord.id, 'vocab-packs', target.id);
          srsMap[packWord.id] = card;
          newCardsToInsert.push(card);
        }
      }
      for (const cw of customWordsList) {
        if (!srsMap[cw.id]) {
          const card = createInitialSrsCard(cw.id, 'custom-words', target.id);
          srsMap[cw.id] = card;
          newCardsToInsert.push(card);
        }
      }

      if (newCardsToInsert.length > 0) {
        await db.srsCards.bulkPut(newCardsToInsert);
      }
    }

    const profileNotifSettings = loadNotificationSettings(target.id, today);

    set({
      currentProfile: target,
      profiles: profiles.map((p) => (p.id === target!.id ? target! : p)),
      activeView: { mode: 'dashboard' },
      completedItems: completedMap,
      srsCards: srsMap,
      customWords: customWordsList,
      interferenceLogs: logs,
      streakDays: target.streakDays,
      totalExercisesSolved: target.totalExercisesSolved,
      correctFirstTryCount: target.correctFirstTryCount,
      notificationSettings: profileNotifSettings,
      isProfileModalOpen: false,
    });
  },

  updateProfile: async (profileId, updates) => {
    const { profiles, currentProfile } = get();
    const existing = profiles.find((p) => p.id === profileId);
    if (!existing) return;

    const updated: UserProfile = {
      ...existing,
      name: updates.name?.trim() ? updates.name.trim() : existing.name,
      avatar: updates.avatar || existing.avatar,
      color: updates.color || existing.color,
    };

    if (db) {
      await db.profiles.put(updated);
    }

    const nextProfiles = profiles.map((p) => (p.id === profileId ? updated : p));
    set({
      profiles: nextProfiles,
      currentProfile: currentProfile?.id === profileId ? updated : currentProfile,
    });
  },

  deleteProfile: async (profileId: string) => {
    const { profiles, currentProfile } = get();
    if (profiles.length <= 1) return;

    if (db) {
      await Promise.all([
        db.profiles.delete(profileId),
        db.completedItems.where('profileId').equals(profileId).delete(),
        db.srsCards.where('profileId').equals(profileId).delete(),
        db.interferenceLogs.where('profileId').equals(profileId).delete(),
        db.customWords.where('profileId').equals(profileId).delete(),
      ]);
    }

    const remainingProfiles = profiles.filter((p) => p.id !== profileId);

    if (currentProfile?.id === profileId) {
      set({ profiles: remainingProfiles });
      await get().switchProfile(remainingProfiles[0].id);
    } else {
      set({ profiles: remainingProfiles });
    }
  },

  addCustomWord: async (input) => {
    const { currentProfile } = get();
    if (!currentProfile) return;

    const pl = input.pl.trim();
    const ru = input.ru.trim();
    if (!pl || !ru) return;

    const newWord: CustomWordRecord = {
      id: `cw-${Date.now()}`,
      profileId: currentProfile.id,
      pl,
      ru,
      pronunciationHint: input.pronunciationHint?.trim() || undefined,
      examplePl: input.examplePl?.trim() || undefined,
      exampleRu: input.exampleRu?.trim() || undefined,
      createdAt: Date.now(),
    };

    const newCard = createInitialSrsCard(newWord.id, 'custom-words', currentProfile.id);

    if (db) {
      await Promise.all([
        db.customWords.put(newWord),
        db.srsCards.put(newCard),
      ]);
    }

    set((state) => ({
      customWords: [newWord, ...state.customWords],
      srsCards: {
        ...state.srsCards,
        [newWord.id]: newCard,
      },
    }));
  },

  deleteCustomWord: async (wordId) => {
    const { currentProfile } = get();
    if (!currentProfile) return;

    if (db) {
      await Promise.all([
        db.customWords.delete(wordId),
        db.srsCards.where({ profileId: currentProfile.id, vocabId: wordId }).delete(),
      ]);
    }

    set((state) => {
      const nextCards = { ...state.srsCards };
      delete nextCards[wordId];
      return {
        customWords: state.customWords.filter((w) => w.id !== wordId),
        srsCards: nextCards,
      };
    });
  },

  markItemCompleted: async (itemId, itemType, scorePercent) => {
    const { selectedModuleId, currentProfile } = get();
    if (!currentProfile) return;

    const record: CompletedItemRecord = {
      profileId: currentProfile.id,
      itemId,
      moduleId: selectedModuleId,
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
    const { currentProfile, profiles, notificationSettings } = get();
    if (!currentProfile) return;

    const today = getTodayIso();
    const totalExercisesSolved = currentProfile.totalExercisesSolved + 1;
    const correctFirstTryCount =
      currentProfile.correctFirstTryCount + (isCorrectFirstTry ? 1 : 0);

    const updatedProfile: UserProfile = {
      ...currentProfile,
      totalExercisesSolved,
      correctFirstTryCount,
      lastActiveDate: today,
    };

    const normalizedNotif = normalizeSettingsForToday(notificationSettings, today);
    const nextNotif: NotificationSettings = {
      ...normalizedNotif,
      todayExercisesDone: normalizedNotif.todayExercisesDone + 1,
    };
    saveNotificationSettings(currentProfile.id, nextNotif);

    if (db) {
      await db.profiles.put(updatedProfile);
    }

    set({
      currentProfile: updatedProfile,
      profiles: profiles.map((p) =>
        p.id === updatedProfile.id ? updatedProfile : p
      ),
      totalExercisesSolved,
      correctFirstTryCount,
      notificationSettings: nextNotif,
    });
  },

  logInterferenceError: async (tag, exerciseId, userInput) => {
    const { currentProfile } = get();
    if (!currentProfile) return;

    const entry: InterferenceErrorLog = {
      profileId: currentProfile.id,
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
