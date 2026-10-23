import Dexie, { type EntityTable } from 'dexie';
import { SrsCardState } from './srs';
import { InterferenceTag } from '@/types/curriculum';

export interface CompletedItemRecord {
  itemId: string; // lessonId, questId, or testId
  moduleId: string;
  itemType: 'lesson' | 'quest' | 'test';
  scorePercent: number;
  completedAt: number;
}

export interface InterferenceErrorLog {
  id?: number;
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
  completedItems!: EntityTable<CompletedItemRecord, 'itemId'>;
  srsCards!: EntityTable<SrsCardState, 'vocabId'>;
  interferenceLogs!: EntityTable<InterferenceErrorLog, 'id'>;
  userMeta!: EntityTable<UserMetaRecord, 'key'>;

  constructor() {
    super('ZaczynamMowicPoPolskuDB');
    this.version(1).stores({
      completedItems: 'itemId, moduleId, itemType',
      srsCards: 'vocabId, moduleId, stage, dueTimestamp',
      interferenceLogs: '++id, tag, exerciseId, timestamp',
      userMeta: 'key',
    });
  }
}

export const db = typeof window !== 'undefined' ? new PolishAppDatabase() : null;
