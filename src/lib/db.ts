import Dexie, { type EntityTable } from 'dexie';
import { SrsCardState } from './srs';
import { InterferenceTag } from '@/types/curriculum';
import { UserProfile } from '@/types/profile';

/** Профиль, к которому привязываются данные, созданные до появления мультипрофильности. */
export const DEFAULT_PROFILE_ID = 'prof-default';

export interface CompletedItemRecord {
  profileId: string;
  itemId: string; // lessonId, questId, or testId
  moduleId: string;
  itemType: 'lesson' | 'quest' | 'test';
  scorePercent: number;
  completedAt: number;
}

export interface InterferenceErrorLog {
  id?: number;
  profileId: string;
  tag: InterferenceTag;
  exerciseId: string;
  userInput: string;
  timestamp: number;
}

export interface UserMetaRecord {
  key: 'profile';
  streakDays: number;
  lastActiveDate: string; // YYYY-MM-DD
  totalExercisesSolved: number;
  correctFirstTryCount: number;
}

export interface CustomWordRecord {
  id: string;
  profileId: string;
  pl: string;
  ru: string;
  pronunciationHint?: string;
  examplePl?: string;
  exampleRu?: string;
  createdAt: number;
}

class PolishAppDatabase extends Dexie {
  profiles!: EntityTable<UserProfile, 'id'>;
  completedItems!: EntityTable<CompletedItemRecord>;
  srsCards!: EntityTable<SrsCardState>;
  interferenceLogs!: EntityTable<InterferenceErrorLog, 'id'>;
  userMeta!: EntityTable<UserMetaRecord, 'key'>;
  customWords!: EntityTable<CustomWordRecord, 'id'>;

  constructor() {
    super('ZaczynamMowicPoPolskuDB');

    // Базовая версия 1 (первоначальный релиз)
    this.version(1).stores({
      completedItems: 'itemId, moduleId, itemType',
      srsCards: 'vocabId, moduleId, stage, dueTimestamp',
      interferenceLogs: '++id, tag, exerciseId, timestamp',
      userMeta: 'key',
    });

    // Версия 2: Dexie не умеет менять primary key, поэтому старые таблицы удаляются,
    // а их данные переносятся во временные таблицы с привязкой к профилю по умолчанию
    // (удалённые таблицы ещё доступны внутри upgrade и удаляются после него).
    this.version(2)
      .stores({
        profiles: 'id, name, createdAt',
        completedItems: null,
        srsCards: null,
        _migCompletedItems: '++_id',
        _migSrsCards: '++_id',
      })
      .upgrade(async (tx) => {
        const [oldCompleted, oldCards] = await Promise.all([
          tx.table('completedItems').toArray(),
          tx.table('srsCards').toArray(),
        ]);
        await tx.table('_migCompletedItems').bulkAdd(
          oldCompleted.map((r) => ({ ...r, profileId: DEFAULT_PROFILE_ID }))
        );
        await tx.table('_migSrsCards').bulkAdd(
          oldCards.map((r) => ({ ...r, profileId: DEFAULT_PROFILE_ID }))
        );
      });

    // Версия 3: мультипрофильная архитектура с составными ключами [profileId+itemId] и [profileId+vocabId]
    this.version(3)
      .stores({
        profiles: 'id, name, createdAt',
        completedItems: '[profileId+itemId], profileId, itemId, moduleId, itemType',
        srsCards: '[profileId+vocabId], profileId, vocabId, moduleId, stage, dueTimestamp',
        interferenceLogs: '++id, profileId, tag, exerciseId, timestamp',
        userMeta: 'key',
        _migCompletedItems: null,
        _migSrsCards: null,
      })
      .upgrade(async (tx) => {
        const stripTmpKey = <T extends { _id?: number }>({ _id, ...rest }: T) => rest;
        const [migCompleted, migCards] = await Promise.all([
          tx.table('_migCompletedItems').toArray(),
          tx.table('_migSrsCards').toArray(),
        ]);
        await tx.table('completedItems').bulkPut(migCompleted.map(stripTmpKey));
        await tx.table('srsCards').bulkPut(migCards.map(stripTmpKey));
        await tx
          .table('interferenceLogs')
          .filter((log) => !log.profileId)
          .modify({ profileId: DEFAULT_PROFILE_ID });
      });

    // Версия 4: пользовательский словарь (собственные слова и фразы для тренировки на слух и правописания)
    this.version(4).stores({
      profiles: 'id, name, createdAt',
      completedItems: '[profileId+itemId], profileId, itemId, moduleId, itemType',
      srsCards: '[profileId+vocabId], profileId, vocabId, moduleId, stage, dueTimestamp',
      interferenceLogs: '++id, profileId, tag, exerciseId, timestamp',
      userMeta: 'key',
      customWords: 'id, profileId, pl, createdAt',
    });
  }
}

export const db = typeof window !== 'undefined' ? new PolishAppDatabase() : null;
