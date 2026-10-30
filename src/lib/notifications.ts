import { SrsCardState } from './srs';

export interface NotificationSettings {
  enabled: boolean;
  reminderTime: string; // HH:MM, e.g. '19:00'
  dailyGoalExercises: number; // e.g. 5, 10, 15, 20
  lastNotifiedDate: string; // YYYY-MM-DD
  todayDate: string; // YYYY-MM-DD
  todayExercisesDone: number;
}

export interface ProgressAlertItem {
  id: string;
  type: 'daily_goal' | 'srs_due' | 'streak_saved' | 'interference_review';
  severity: 'urgent' | 'info' | 'success';
  titleRu: string;
  bodyRu: string;
  actionLabelRu?: string;
  actionTarget?: 'lesson' | 'srs_dictation' | 'srs_spelling' | 'srs_context';
}

export function getTodayIsoDate(): string {
  return new Date().toISOString().slice(0, 10);
}

const STORAGE_PREFIX = 'polish_notif_settings_';

export function getDefaultNotificationSettings(today = getTodayIsoDate()): NotificationSettings {
  return {
    enabled: false,
    reminderTime: '19:00',
    dailyGoalExercises: 10,
    lastNotifiedDate: '',
    todayDate: today,
    todayExercisesDone: 0,
  };
}

export function normalizeSettingsForToday(
  settings: NotificationSettings,
  today = getTodayIsoDate()
): NotificationSettings {
  if (settings.todayDate !== today) {
    return {
      ...settings,
      todayDate: today,
      todayExercisesDone: 0,
    };
  }
  return settings;
}

export function loadNotificationSettings(
  profileId: string,
  today = getTodayIsoDate()
): NotificationSettings {
  if (typeof window === 'undefined') {
    return getDefaultNotificationSettings(today);
  }
  try {
    const raw = localStorage.getItem(`${STORAGE_PREFIX}${profileId}`);
    if (!raw) return getDefaultNotificationSettings(today);
    const parsed = JSON.parse(raw) as Partial<NotificationSettings>;
    const merged: NotificationSettings = {
      ...getDefaultNotificationSettings(today),
      ...parsed,
    };
    return normalizeSettingsForToday(merged, today);
  } catch {
    return getDefaultNotificationSettings(today);
  }
}

export function saveNotificationSettings(
  profileId: string,
  settings: NotificationSettings
): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(`${STORAGE_PREFIX}${profileId}`, JSON.stringify(settings));
  } catch {
    // Ignore storage quota errors
  }
}

/**
 * Подсчитывает карточки SRS, у которых подошёл срок повторения (dueTimestamp <= now)
 * и которые уже хотя бы раз просматривались учеником (repetitions > 0).
 */
export function countDueSrsCards(
  srsCards: Record<string, SrsCardState>,
  now = Date.now()
): { dueReviewedCount: number; newUnseenCount: number } {
  let dueReviewedCount = 0;
  let newUnseenCount = 0;

  for (const card of Object.values(srsCards)) {
    if (card.repetitions === 0) {
      newUnseenCount++;
    } else if (card.dueTimestamp <= now) {
      dueReviewedCount++;
    }
  }

  return { dueReviewedCount, newUnseenCount };
}

/**
 * Формирует список умных уведомлений для поддержания ежедневного прогресса.
 */
export function computeProgressAlerts(params: {
  settings: NotificationSettings;
  streakDays: number;
  srsCards: Record<string, SrsCardState>;
  interferenceErrorsCount: number;
  now?: number;
}): ProgressAlertItem[] {
  const { settings, streakDays, srsCards, interferenceErrorsCount, now = Date.now() } = params;
  const alerts: ProgressAlertItem[] = [];

  const remainingExercises = Math.max(
    0,
    settings.dailyGoalExercises - settings.todayExercisesDone
  );

  if (remainingExercises > 0) {
    alerts.push({
      id: 'alert-daily-goal',
      type: 'daily_goal',
      severity: settings.todayExercisesDone === 0 ? 'urgent' : 'info',
      titleRu:
        settings.todayExercisesDone === 0
          ? `🔥 Поддержите серию ${streakDays} дн. — начните занятие сегодня!`
          : `🎯 До дневной цели осталось ${remainingExercises} упр. (${settings.todayExercisesDone}/${settings.dailyGoalExercises})`,
      bodyRu:
        settings.todayExercisesDone === 0
          ? `Регулярность — главный секрет сдачи экзамена B1/B2. Выполните ${settings.dailyGoalExercises} коротких заданий или пропишите десяток слов.`
          : `Вы уже выполнили ${settings.todayExercisesDone} из ${settings.dailyGoalExercises} упражнений на сегодня. Ещё немного до 100% дневной нормы!`,
      actionLabelRu: 'Тренировать слова на слух →',
      actionTarget: 'srs_dictation',
    });
  } else {
    alerts.push({
      id: 'alert-daily-goal-done',
      type: 'streak_saved',
      severity: 'success',
      titleRu: `✅ Дневная цель выполнена (${settings.todayExercisesDone}/${settings.dailyGoalExercises} упр.)!`,
      bodyRu: `Отличная работа! Ваша ударная серия (${streakDays} дн.) защищена. Можете закрепить успех в квесте или отдохнуть до завтра.`,
    });
  }

  const { dueReviewedCount, newUnseenCount } = countDueSrsCards(srsCards, now);

  if (dueReviewedCount > 0) {
    alerts.push({
      id: 'alert-srs-due',
      type: 'srs_due',
      severity: 'urgent',
      titleRu: `⏰ Пора освежить в памяти: ${dueReviewedCount} сл. по расписанию SRS`,
      bodyRu:
        'Интервальный алгоритм определил, что эти слова сейчас находятся на грани забывания. Пропишите их по памяти или на слух.',
      actionLabelRu: 'Прописать слова (RU → PL) →',
      actionTarget: 'srs_spelling',
    });
  } else if (newUnseenCount > 0) {
    alerts.push({
      id: 'alert-srs-new',
      type: 'srs_due',
      severity: 'info',
      titleRu: `📚 Доступно ${newUnseenCount} новых слов для расширения словарного запаса`,
      bodyRu:
        'Возьмите порцию из 10 новых слов в режиме аудиодиктанта или правописания, чтобы продвинуться к уровню B1/B2.',
      actionLabelRu: 'Открыть тренажёр слов →',
      actionTarget: 'srs_spelling',
    });
  }

  if (interferenceErrorsCount > 0) {
    alerts.push({
      id: 'alert-interference',
      type: 'interference_review',
      severity: 'info',
      titleRu: `⚠️ Зафиксировано калек и ловушек: ${interferenceErrorsCount}`,
      bodyRu:
        'Загляните в Радар калек или потренируйте пакет «Ложные друзья переводчика», чтобы не допустить эти ошибки на экзамене.',
      actionLabelRu: 'Морфология в контексте →',
      actionTarget: 'srs_context',
    });
  }

  return alerts;
}

/**
 * Проверяет, наступило ли время ежедневного напоминания (ЧЧ:ММ) сегодня.
 */
export function shouldTriggerScheduledNotification(
  settings: NotificationSettings,
  nowDate = new Date()
): boolean {
  if (!settings.enabled) return false;
  const todayIso = nowDate.toISOString().slice(0, 10);
  if (settings.lastNotifiedDate === todayIso) return false;
  if (settings.todayExercisesDone >= settings.dailyGoalExercises) return false;

  const [targetHourStr, targetMinStr] = settings.reminderTime.split(':');
  const targetHour = Number(targetHourStr);
  const targetMin = Number(targetMinStr);
  if (Number.isNaN(targetHour) || Number.isNaN(targetMin)) return false;

  const currentMinutes = nowDate.getHours() * 60 + nowDate.getMinutes();
  const targetMinutes = targetHour * 60 + targetMin;

  return currentMinutes >= targetMinutes;
}

export async function requestBrowserNotificationPermission(): Promise<
  NotificationPermission | 'unsupported'
> {
  if (typeof window === 'undefined' || !('Notification' in window)) {
    return 'unsupported';
  }
  if (Notification.permission === 'granted') {
    return 'granted';
  }
  return await Notification.requestPermission();
}

export function sendStudyNotification(title: string, body: string): boolean {
  if (typeof window === 'undefined' || !('Notification' in window)) {
    return false;
  }
  if (Notification.permission !== 'granted') {
    return false;
  }
  try {
    new Notification(title, {
      body,
      tag: 'polish-study-reminder',
    });
    return true;
  } catch {
    return false;
  }
}
