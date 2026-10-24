import 'fake-indexeddb/auto';
import { describe, it, expect, beforeAll } from 'vitest';
import Dexie from 'dexie';

const DB_NAME = 'ZaczynamMowicPoPolskuDB';

describe('IndexedDB migration v1 -> multi-profile schema', () => {
  beforeAll(async () => {
    // Существующий пользователь на схеме v1 (до появления профилей)
    const v1 = new Dexie(DB_NAME);
    v1.version(1).stores({
      completedItems: 'itemId, moduleId, itemType',
      srsCards: 'vocabId, moduleId, stage, dueTimestamp',
      interferenceLogs: '++id, tag, exerciseId, timestamp',
      userMeta: 'key',
    });
    await v1.table('completedItems').put({
      itemId: 'les-a0-01-1', moduleId: 'mod-a0-01', itemType: 'lesson', scorePercent: 90, completedAt: 1,
    });
    await v1.table('srsCards').put({
      vocabId: 'voc-byc', moduleId: 'mod-a0-01', stage: 'production',
      intervalDays: 10, easeFactor: 2.5, repetitions: 3, dueTimestamp: 1, lapses: 0,
    });
    await v1.table('interferenceLogs').add({
      tag: 'ERR_FALSE_FRIEND', exerciseId: 'ex-1', userInput: 'x', timestamp: 1,
    });
    v1.close();
  });

  it('сохраняет прогресс, карточки SRS и логи ошибок, привязывая их к профилю по умолчанию', async () => {
    (globalThis as { window?: unknown }).window = globalThis;
    const { db, DEFAULT_PROFILE_ID } = await import('../db');
    await db!.open();

    const completed = await db!.completedItems.toArray();
    expect(completed).toHaveLength(1);
    expect(completed[0]).toMatchObject({ profileId: DEFAULT_PROFILE_ID, itemId: 'les-a0-01-1', scorePercent: 90 });

    const cards = await db!.srsCards.toArray();
    expect(cards).toHaveLength(1);
    expect(cards[0]).toMatchObject({ profileId: DEFAULT_PROFILE_ID, vocabId: 'voc-byc', stage: 'production', intervalDays: 10 });

    const logs = await db!.interferenceLogs.where('profileId').equals(DEFAULT_PROFILE_ID).toArray();
    expect(logs).toHaveLength(1);

    expect(db!.tables.map((t) => t.name)).not.toContain('_migCompletedItems');
    expect(db!.tables.map((t) => t.name)).not.toContain('_migSrsCards');
  });
});
