'use client';

import React, { useEffect, useId, useMemo, useRef, useState } from 'react';
import {
  Bell,
  BellRing,
  CheckCircle2,
  Clock,
  Flame,
  Target,
  X,
  AlertTriangle,
  Sparkles,
} from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import {
  computeProgressAlerts,
  countDueSrsCards,
  requestBrowserNotificationPermission,
  sendStudyNotification,
  shouldTriggerScheduledNotification,
  getTodayIsoDate,
  ProgressAlertItem,
} from '@/lib/notifications';

export function NotificationCenter() {
  const {
    isHydrated,
    streakDays,
    srsCards,
    interferenceLogs,
    notificationSettings,
    updateNotificationSettings,
    setView,
  } = useAppStore();

  const [isOpen, setIsOpen] = useState(false);
  const [testFeedback, setTestFeedback] = useState<string | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  const alerts = useMemo(
    () =>
      computeProgressAlerts({
        settings: notificationSettings,
        streakDays,
        srsCards,
        interferenceErrorsCount: interferenceLogs.length,
      }),
    [notificationSettings, streakDays, srsCards, interferenceLogs.length]
  );

  const urgentCount = useMemo(
    () => alerts.filter((a) => a.severity === 'urgent').length,
    [alerts]
  );

  const progressPercent = Math.min(
    100,
    Math.round(
      (notificationSettings.todayExercisesDone /
        Math.max(1, notificationSettings.dailyGoalExercises)) *
        100
    )
  );

  // Фоновая проверка расписания напоминаний (каждые 45 секунд)
  useEffect(() => {
    if (!isHydrated || !notificationSettings.enabled) return;

    const checkSchedule = () => {
      const now = new Date();
      if (shouldTriggerScheduledNotification(notificationSettings, now)) {
        const { dueReviewedCount } = countDueSrsCards(srsCards, now.getTime());
        const remaining = Math.max(
          0,
          notificationSettings.dailyGoalExercises -
            notificationSettings.todayExercisesDone
        );
        const sent = sendStudyNotification(
          `🦉 Czas na polski! Серия: ${streakDays} дн.`,
          `До дневной нормы осталось ${remaining} упр.${
            dueReviewedCount > 0 ? ` • Слов к повторению SRS: ${dueReviewedCount}` : ''
          }`
        );
        if (sent) {
          updateNotificationSettings({ lastNotifiedDate: getTodayIsoDate() });
        }
      }
    };

    checkSchedule();
    const timer = window.setInterval(checkSchedule, 45_000);
    return () => window.clearInterval(timer);
  }, [
    isHydrated,
    notificationSettings,
    srsCards,
    streakDays,
    updateNotificationSettings,
  ]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen && !dialog.open) {
      dialog.showModal();
    } else if (!isOpen && dialog.open) {
      dialog.close();
    }
  }, [isOpen]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleClose = () => setIsOpen(false);
    dialog.addEventListener('close', handleClose);

    const handleBackdropClick = (event: MouseEvent) => {
      if ('closedBy' in HTMLDialogElement.prototype) return;
      if (event.target !== dialog) return;
      const rect = dialog.getBoundingClientRect();
      const isDialogContent =
        rect.top <= event.clientY &&
        event.clientY <= rect.top + rect.height &&
        rect.left <= event.clientX &&
        event.clientX <= rect.left + rect.width;
      if (!isDialogContent) {
        dialog.close();
      }
    };

    dialog.addEventListener('click', handleBackdropClick);
    return () => {
      dialog.removeEventListener('close', handleClose);
      dialog.removeEventListener('click', handleBackdropClick);
    };
  }, []);

  const handleToggleBrowserNotifications = async (nextEnabled: boolean) => {
    setTestFeedback(null);
    if (!nextEnabled) {
      updateNotificationSettings({ enabled: false });
      return;
    }

    const perm = await requestBrowserNotificationPermission();
    if (perm === 'granted') {
      updateNotificationSettings({ enabled: true });
      setTestFeedback(
        '✅ Браузерные уведомления включены! Напоминание придёт в выбранное время.'
      );
    } else if (perm === 'unsupported') {
      updateNotificationSettings({ enabled: true });
      setTestFeedback(
        'ℹ️ Ваш браузер не поддерживает системные push-окна, но внутренние напоминания в приложении активны.'
      );
    } else {
      updateNotificationSettings({ enabled: false });
      setTestFeedback(
        '⚠️ Разрешение на уведомления отклонено в настройках браузера. Вы всё равно будете видеть напоминания внутри приложения.'
      );
    }
  };

  const handleSendTestNotification = async () => {
    const perm = await requestBrowserNotificationPermission();
    const { dueReviewedCount } = countDueSrsCards(srsCards);
    if (perm === 'granted') {
      const ok = sendStudyNotification(
        `🦉 Czas na polski! Серия: ${streakDays} дн.`,
        `Дневная цель: ${notificationSettings.todayExercisesDone}/${notificationSettings.dailyGoalExercises} упр. • К повторению SRS: ${dueReviewedCount} сл.`
      );
      if (ok) {
        setTestFeedback(
          '🔔 Тестовое уведомление отправлено! Проверьте системную панель уведомлений.'
        );
        return;
      }
    }
    setTestFeedback(
      `🦉 Напоминание (внутри приложения): Серия ${streakDays} дн. • Дневная цель: ${notificationSettings.todayExercisesDone}/${notificationSettings.dailyGoalExercises} упр.`
    );
  };

  const handleAlertAction = (target?: ProgressAlertItem['actionTarget']) => {
    setIsOpen(false);
    if (target === 'srs_dictation') {
      setView({ mode: 'srs_session', drillMode: 'dictation' });
    } else if (target === 'srs_spelling') {
      setView({ mode: 'srs_session', drillMode: 'spelling' });
    } else if (target === 'srs_context') {
      setView({ mode: 'srs_session', drillMode: 'context' });
    }
  };

  const isGoalDone =
    notificationSettings.todayExercisesDone >=
    notificationSettings.dailyGoalExercises;

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className={`relative inline-flex items-center gap-1.5 rounded-xl border px-2.5 py-1.5 text-xs font-bold transition-colors ${
          isGoalDone
            ? 'border-emerald-200 bg-emerald-50 text-emerald-900 hover:bg-emerald-100'
            : 'border-slate-200 bg-slate-50 text-slate-800 hover:bg-slate-100'
        }`}
        title="Уведомления, дневная цель и напоминания о занятиях"
      >
        {notificationSettings.enabled ? (
          <BellRing className="h-4 w-4 text-red-600" aria-hidden="true" />
        ) : (
          <Bell className="h-4 w-4 text-slate-600" aria-hidden="true" />
        )}
        <span className="hidden md:inline">
          Цель: {notificationSettings.todayExercisesDone}/
          {notificationSettings.dailyGoalExercises}
        </span>
        {urgentCount > 0 && (
          <span
            aria-label={`${urgentCount} важных напоминаний`}
            className="flex h-4 min-w-4 items-center justify-center rounded-full bg-red-600 px-1 text-[10px] font-extrabold text-white"
          >
            {urgentCount}
          </span>
        )}
      </button>

      <dialog
        ref={dialogRef}
        {...({ closedby: 'any' } as React.DialogHTMLAttributes<HTMLDialogElement>)}
        aria-labelledby={titleId}
        className="m-auto w-full max-w-xl rounded-2xl border border-slate-200 bg-white p-0 text-slate-900 shadow-2xl backdrop:bg-slate-950/60 backdrop:backdrop-blur-xs"
      >
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white px-6 py-4">
          <div className="flex items-center gap-2.5">
            <BellRing className="h-5 w-5 text-red-600" aria-hidden="true" />
            <h2 id={titleId} className="text-base sm:text-lg font-extrabold text-slate-900">
              Напоминания и контроль ежедневного прогресса
            </h2>
          </div>
          <form method="dialog">
            <button
              type="submit"
              aria-label="Закрыть окно уведомлений"
              className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 hover:text-slate-800"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </form>
        </div>

        <div className="max-h-[78vh] space-y-5 overflow-y-auto p-6">
          {/* 1. Прогресс дневной нормы */}
          <section className="rounded-2xl border border-slate-200 bg-slate-50 p-4 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4 text-red-600" aria-hidden="true" />
                <span className="text-sm font-extrabold text-slate-900">
                  Дневная норма: {notificationSettings.todayExercisesDone} из{' '}
                  {notificationSettings.dailyGoalExercises} упр. ({progressPercent}%)
                </span>
              </div>

              <span className="inline-flex items-center gap-1 rounded-lg bg-amber-100 px-2.5 py-1 text-xs font-bold text-amber-900">
                <Flame className="h-3.5 w-3.5 text-amber-600" aria-hidden="true" />
                Серия: {streakDays} дн.
              </span>
            </div>

            <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-200">
              <div
                className={`h-full transition-all duration-300 ${
                  isGoalDone ? 'bg-emerald-600' : 'bg-red-600'
                }`}
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
              <span className="text-xs font-medium text-slate-600">
                Ежедневная цель упражнений:
              </span>
              <div className="flex items-center gap-1.5">
                {[5, 10, 15, 20].map((goal) => (
                  <button
                    key={goal}
                    type="button"
                    onClick={() =>
                      updateNotificationSettings({ dailyGoalExercises: goal })
                    }
                    className={`rounded-lg px-2.5 py-1 text-xs font-bold transition-colors ${
                      notificationSettings.dailyGoalExercises === goal
                        ? 'bg-slate-900 text-white'
                        : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {goal} упр.
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* 2. Умные уведомления на сегодня */}
          <section className="space-y-2.5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Актуальные задачи и уведомления ({alerts.length})
            </h3>
            <div className="space-y-2.5">
              {alerts.map((alert) => (
                <article
                  key={alert.id}
                  className={`rounded-xl border p-3.5 space-y-2 ${
                    alert.severity === 'urgent'
                      ? 'border-red-200 bg-red-50/60'
                      : alert.severity === 'success'
                      ? 'border-emerald-200 bg-emerald-50/70'
                      : 'border-slate-200 bg-white'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="text-sm font-bold text-slate-900">
                      {alert.titleRu}
                    </h4>
                    {alert.severity === 'urgent' && (
                      <AlertTriangle
                        className="h-4 w-4 text-red-600 shrink-0 mt-0.5"
                        aria-hidden="true"
                      />
                    )}
                    {alert.severity === 'success' && (
                      <CheckCircle2
                        className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5"
                        aria-hidden="true"
                      />
                    )}
                    {alert.severity === 'info' && (
                      <Sparkles
                        className="h-4 w-4 text-indigo-600 shrink-0 mt-0.5"
                        aria-hidden="true"
                      />
                    )}
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {alert.bodyRu}
                  </p>
                  {alert.actionLabelRu && alert.actionTarget && (
                    <button
                      type="button"
                      onClick={() => handleAlertAction(alert.actionTarget)}
                      className="inline-flex items-center gap-1 rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-bold text-white hover:bg-slate-800"
                    >
                      {alert.actionLabelRu}
                    </button>
                  )}
                </article>
              ))}
            </div>
          </section>

          {/* 3. Настройка браузерных / системных напоминаний по расписанию */}
          <section className="rounded-2xl border border-slate-200 bg-slate-50 p-4 space-y-3">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h3 className="text-sm font-extrabold text-slate-900">
                  Ежедневное браузерное напоминание
                </h3>
                <p className="text-xs text-slate-500">
                  Напомнит позаниматься польским, если дневная цель ещё не закрыта.
                </p>
              </div>
              <label className="inline-flex cursor-pointer items-center gap-2">
                <input
                  type="checkbox"
                  checked={notificationSettings.enabled}
                  onChange={(e) =>
                    handleToggleBrowserNotifications(e.target.checked)
                  }
                  className="h-4 w-4 rounded border-slate-300 text-red-600 focus:ring-red-500"
                />
                <span className="text-xs font-bold text-slate-800">
                  {notificationSettings.enabled ? 'Включено' : 'Выключено'}
                </span>
              </label>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-slate-500" aria-hidden="true" />
                <label
                  htmlFor="reminder-time-input"
                  className="text-xs font-bold text-slate-700"
                >
                  Время напоминания:
                </label>
                <input
                  id="reminder-time-input"
                  type="time"
                  value={notificationSettings.reminderTime}
                  onChange={(e) =>
                    updateNotificationSettings({ reminderTime: e.target.value })
                  }
                  className="rounded-lg border border-slate-300 bg-white px-2.5 py-1 text-xs font-bold text-slate-900 focus:border-red-600 focus:outline-hidden"
                />
              </div>

              <button
                type="button"
                onClick={handleSendTestNotification}
                className="inline-flex items-center gap-1.5 rounded-xl border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-bold text-red-700 hover:bg-red-100"
              >
                <BellRing className="h-3.5 w-3.5" aria-hidden="true" />
                Проверить уведомление (Тест)
              </button>
            </div>

            {testFeedback && (
              <p className="rounded-lg border border-indigo-200 bg-indigo-50 px-3 py-2 text-xs font-medium text-indigo-950">
                {testFeedback}
              </p>
            )}
          </section>
        </div>
      </dialog>
    </>
  );
}
