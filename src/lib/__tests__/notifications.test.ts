import { describe, it, expect } from 'vitest';
import {
  getDefaultNotificationSettings,
  normalizeSettingsForToday,
  countDueSrsCards,
  computeProgressAlerts,
  shouldTriggerScheduledNotification,
} from '../notifications';

describe('Система уведомлений и поддержания ежедневного прогресса (notifications.ts)', () => {
  it('1. Сбрасывает счётчик упражнений за день (todayExercisesDone) при наступлении нового дня', () => {
    const yesterdaySettings = {
      ...getDefaultNotificationSettings('2026-10-28'),
      todayExercisesDone: 8,
    };

    const normalized = normalizeSettingsForToday(yesterdaySettings, '2026-10-29');
    expect(normalized.todayDate).toBe('2026-10-29');
    expect(normalized.todayExercisesDone).toBe(0);
  });

  it('2. Корректно подсчитывает карточки SRS к повторению и новые карточки', () => {
    const now = 1_700_000_000_000;
    const srsCards = {
      c1: {
        profileId: 'p1',
        vocabId: 'c1',
        moduleId: 'mod-a0-01',
        stage: 'recognition' as const,
        easeFactor: 2.5,
        intervalDays: 1,
        repetitions: 2,
        dueTimestamp: now - 10_000, // Срок подошёл
        lapses: 0,
      },
      c2: {
        profileId: 'p1',
        vocabId: 'c2',
        moduleId: 'mod-a0-01',
        stage: 'production' as const,
        easeFactor: 2.5,
        intervalDays: 6,
        repetitions: 3,
        dueTimestamp: now + 86_400_000, // Ещё не подошёл
        lapses: 0,
      },
      c3: {
        profileId: 'p1',
        vocabId: 'c3',
        moduleId: 'mod-a0-01',
        stage: 'recognition' as const,
        easeFactor: 2.5,
        intervalDays: 0,
        repetitions: 0, // Новая карточка
        dueTimestamp: 0,
        lapses: 0,
      },
    };

    const counts = countDueSrsCards(srsCards, now);
    expect(counts.dueReviewedCount).toBe(1);
    expect(counts.newUnseenCount).toBe(1);
  });

  it('3. Формирует умные уведомления о дневной норме, SRS и ловушках интерференции', () => {
    const settings = {
      ...getDefaultNotificationSettings('2026-10-29'),
      dailyGoalExercises: 10,
      todayExercisesDone: 3,
    };

    const alerts = computeProgressAlerts({
      settings,
      streakDays: 5,
      srsCards: {},
      interferenceErrorsCount: 2,
    });

    expect(alerts.some((a) => a.type === 'daily_goal')).toBe(true);
    expect(alerts.some((a) => a.type === 'interference_review')).toBe(true);
  });

  it('4. Срабатывает по расписанию ЧЧ:ММ только если напоминание включено и норма ещё не выполнена', () => {
    const settings = {
      ...getDefaultNotificationSettings('2026-10-29'),
      enabled: true,
      reminderTime: '19:00',
      dailyGoalExercises: 10,
      todayExercisesDone: 4,
    };

    const beforeTime = new Date('2026-10-29T18:30:00');
    const afterTime = new Date('2026-10-29T19:05:00');

    expect(shouldTriggerScheduledNotification(settings, beforeTime)).toBe(false);
    expect(shouldTriggerScheduledNotification(settings, afterTime)).toBe(true);

    // Если дневная норма уже выполнена — не беспокоим пользователя
    const completedSettings = { ...settings, todayExercisesDone: 10 };
    expect(shouldTriggerScheduledNotification(completedSettings, afterTime)).toBe(false);
  });
});
