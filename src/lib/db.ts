import Dexie, { type EntityTable } from 'dexie';
import { SrsCardState } from './srs';
import { InterferenceTag } from '@/types/curriculum';
import { UserProfile } from '@/types/profile';

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

class PolishAppDatabase extends Dexie {
  profiles!: EntityTable<UserProfile, 'id'>;
  completedItems!: EntityTable<CompletedItemRecord>;
  srsCards!: EntityTable<SrsCardState>;
  interferenceLogs!: EntityTable<InterferenceErrorLog, 'id'>;
  userMeta!: EntityTable<UserMetaRecord, 'key'>;

  constructor() {
    super('ZaczynamMowicPoPolskuDB');

    // Базовая версия 1 (первоначальный релиз)
    this.version(1).stores({
      completedItems: 'itemId, moduleId, itemType',
      srsCards: 'vocabId, moduleId, stage, dueTimestamp',
      interferenceLogs: '++id, tag, exerciseId, timestamp',
      userMeta: 'key',
    });

    // Версия 2: сброс таблиц со старыми одинарными primary key
    this.version(2).stores({
      profiles: 'id, name, createdAt',
      completedItems: null,
      srsCards: null,
    });

    // Версия 3: мультипрофильная архитектура с составными ключами [profileId+itemId] и [profileId+vocabId]
    this.version(3).stores({
      profiles: 'id, name, createdAt',
      completedItems: '[profileId+itemId], profileId, itemId, moduleId, itemType',
      srsCards: '[profileId+vocabId], profileId, vocabId, moduleId, stage, dueTimestamp',
      interferenceLogs: '++id, profileId, tag, exerciseId, timestamp',
      userMeta: 'key',
    });
  }
}

export const db = typeof window !== 'undefined' ? new PolishAppDatabase() : null;
