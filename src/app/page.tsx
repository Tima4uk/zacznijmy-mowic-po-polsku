'use client';

import React, { useEffect, useState } from 'react';
import {
  Flame,
  BookOpen,
  Brain,
  MapPin,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Volume2,
  Sparkles,
  Award,
  AlertTriangle,
  Compass,
  Layers,
  Users,
} from 'lucide-react';
import { ALL_MODULES, getModuleById } from '@/content/modules';
import { COURSE_ROADMAP } from '@/content/roadmap';
import { useAppStore } from '@/store/useAppStore';
import { LessonRunner } from '@/components/LessonRunner';
import { QuestRunner } from '@/components/QuestRunner';
import { FinalTestRunner } from '@/components/FinalTestRunner';
import { SrsTrainer } from '@/components/SrsTrainer';
import { GrammarDialog } from '@/components/GrammarDialog';
import { ProfileModal } from '@/components/ProfileModal';
import { InstallPrompt } from '@/components/InstallPrompt';
import { playPolishAudio } from '@/lib/audio';

export default function HomePage() {
  const {
    isHydrated,
    hydrateFromDb,
    selectedModuleId,
    selectModule,
    activeView,
    setView,
    currentProfile,
    setProfileModalOpen,
    completedItems,
    srsCards,
    interferenceLogs,
    streakDays,
    totalExercisesSolved,
    correctFirstTryCount,
  } = useAppStore();

  const [isGrammarOpen, setIsGrammarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'lessons' | 'vocab' | 'roadmap'>('lessons');

  useEffect(() => {
    hydrateFromDb();
  }, [hydrateFromDb]);

  const activeModule = getModuleById(selectedModuleId);

  const accuracyPercent =
    totalExercisesSolved > 0
      ? Math.round((correctFirstTryCount / totalExercisesSolved) * 100)
      : 100;

  const moduleVocabIds = new Set(activeModule.vocabulary.map((v) => v.id));
  const moduleSrsCards = Object.values(srsCards).filter((c) =>
    moduleVocabIds.has(c.vocabId)
  );
  const productionStageCount = moduleSrsCards.filter(
    (c) => c.stage === 'production'
  ).length;

  const completedLessonsCount = activeModule.lessons.filter(
    (l) => Boolean(completedItems[l.id])
  ).length;
  const isQuestCompleted = Boolean(completedItems[activeModule.quest.id]);
  const isTestCompleted = Boolean(completedItems[activeModule.finalTest.id]);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur-xs">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3.5">
          <button
            type="button"
            onClick={() => setView({ mode: 'dashboard' })}
            className="flex items-center gap-2.5 text-left"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-600 font-extrabold text-white shadow-2xs">
              PL
            </div>
            <div>
              <span className="block text-sm sm:text-base font-extrabold text-slate-900 leading-tight">
                Zaczynam mówić po polsku
              </span>
              <span className="block text-xs font-medium text-slate-500">
                Путь A0 → B1 (Rezydent UE) → B2 • Релиз 2 (v0.2.0)
              </span>
            </div>
          </button>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={() => setProfileModalOpen(true)}
              className="inline-flex items-center gap-1.5 rounded-xl border border-indigo-200 bg-indigo-50/80 hover:bg-indigo-100 px-2.5 py-1.5 text-xs font-bold text-indigo-950 transition-colors shadow-2xs"
              title="Переключить или создать профиль ученика"
            >
              <span className="text-sm">{currentProfile?.avatar || '🦉'}</span>
              <span className="max-w-[70px] sm:max-w-[110px] truncate font-semibold">
                {currentProfile?.name || 'Ученик'}
              </span>
            </button>

            <div
              className="inline-flex items-center gap-1.5 rounded-xl border border-amber-200 bg-amber-50 px-3 py-1.5 text-xs font-bold text-amber-900"
              title="Серия дней занятий"
            >
              <Flame className="h-4 w-4 text-amber-600" aria-hidden="true" />
              <span>{isHydrated ? streakDays : 1} дн.</span>
            </div>

            <button
              type="button"
              onClick={() => setIsGrammarOpen(true)}
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-800 hover:bg-slate-100"
            >
              <Sparkles className="h-4 w-4 text-red-600" aria-hidden="true" />
              <span className="hidden sm:inline">Шпаргалка и кальки</span>
              <span className="sm:hidden">Правила</span>
            </button>

            <InstallPrompt />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-6 sm:py-8">
        {activeView.mode === 'lesson' && (
          <LessonRunner
            lessonId={activeView.lessonId}
            onOpenGrammar={() => setIsGrammarOpen(true)}
          />
        )}

        {activeView.mode === 'quest' && <QuestRunner />}

        {activeView.mode === 'final_test' && <FinalTestRunner />}

        {activeView.mode === 'srs_session' && <SrsTrainer />}

        {activeView.mode === 'dashboard' && (
          <div className="space-y-6">
            {/* Module Switcher Bar */}
            <section
              aria-label="Выбор учебного модуля"
              className="flex flex-wrap items-center gap-2 rounded-2xl border border-slate-200 bg-white p-3 shadow-2xs"
            >
              <span className="inline-flex items-center gap-1.5 px-2.5 text-xs font-bold uppercase tracking-wider text-slate-500">
                <Layers className="h-4 w-4 text-red-600" aria-hidden="true" />
                Модуль:
              </span>
              {ALL_MODULES.map((mod) => {
                const isSelected = mod.id === activeModule.id;
                const isModTestDone = Boolean(completedItems[mod.finalTest.id]);
                return (
                  <button
                    key={mod.id}
                    type="button"
                    onClick={() => {
                      selectModule(mod.id);
                      setActiveTab('lessons');
                    }}
                    className={`inline-flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs sm:text-sm font-bold transition-all ${
                      isSelected
                        ? 'bg-slate-900 text-white shadow-2xs'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    <span>
                      Модуль {mod.releaseNumber} ({mod.level})
                    </span>
                    {isModTestDone && (
                      <CheckCircle2
                        className="h-3.5 w-3.5 text-emerald-400"
                        aria-hidden="true"
                      />
                    )}
                  </button>
                );
              })}
            </section>

            {/* Hero / Metrics Banner */}
            <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-2xs space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-2 rounded-md bg-red-50 px-2.5 py-1 text-xs font-bold text-red-700 border border-red-200">
                    <span>
                      Релиз #{activeModule.releaseNumber} • Уровень {activeModule.level}
                    </span>
                  </div>
                  <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                    {activeModule.titlePl}
                  </h1>
                  <p className="text-sm text-slate-600 max-w-2xl">
                    {activeModule.subtitleRu}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setView({ mode: 'srs_session' })}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-3 text-sm font-bold text-white shadow-xs hover:bg-red-700 transition-colors shrink-0"
                >
                  <Brain className="h-4 w-4" aria-hidden="true" />
                  Тренировка слов SRS ({activeModule.vocabulary.length})
                </button>
              </div>

              {/* Measurable Learning Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-3.5">
                  <span className="text-xs font-medium text-slate-500 block">
                    Прогресс Модуля {activeModule.releaseNumber}
                  </span>
                  <span className="text-lg font-extrabold text-slate-900">
                    {completedLessonsCount} / {activeModule.lessons.length} уроков
                  </span>
                </div>

                <div className="rounded-xl border border-slate-200 bg-slate-50 p-3.5">
                  <span className="text-xs font-medium text-slate-500 block">
                    Точность с 1-й попытки
                  </span>
                  <span className="text-lg font-extrabold text-emerald-700">
                    {accuracyPercent}%{' '}
                    <span className="text-xs font-normal text-slate-500">
                      ({totalExercisesSolved} упр.)
                    </span>
                  </span>
                </div>

                <div className="rounded-xl border border-slate-200 bg-slate-50 p-3.5">
                  <span className="text-xs font-medium text-slate-500 block">
                    Активная морфология SRS
                  </span>
                  <span className="text-lg font-extrabold text-slate-900">
                    {productionStageCount} / {activeModule.vocabulary.length} слов
                  </span>
                </div>

                <div className="rounded-xl border border-slate-200 bg-slate-50 p-3.5">
                  <span className="text-xs font-medium text-slate-500 block">
                    Всего в базе курса
                  </span>
                  <span className="text-sm font-bold text-red-700 block mt-0.5">
                    {ALL_MODULES.length} модуля • 24 карточки SRS
                  </span>
                </div>
              </div>
            </section>

            {/* Navigation Tabs */}
            <nav
              aria-label="Разделы обучения"
              className="flex border-b border-slate-200 gap-2"
            >
              <button
                type="button"
                onClick={() => setActiveTab('lessons')}
                className={`inline-flex items-center gap-2 border-b-2 px-4 py-2.5 text-sm font-bold transition-colors ${
                  activeTab === 'lessons'
                    ? 'border-red-600 text-red-700'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                <BookOpen className="h-4 w-4" aria-hidden="true" />
                Уроки и Миссия Модуля {activeModule.releaseNumber}
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('vocab')}
                className={`inline-flex items-center gap-2 border-b-2 px-4 py-2.5 text-sm font-bold transition-colors ${
                  activeTab === 'vocab'
                    ? 'border-red-600 text-red-700'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                <Volume2 className="h-4 w-4" aria-hidden="true" />
                Словарь с озвучкой ({activeModule.vocabulary.length})
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('roadmap')}
                className={`inline-flex items-center gap-2 border-b-2 px-4 py-2.5 text-sm font-bold transition-colors ${
                  activeTab === 'roadmap'
                    ? 'border-red-600 text-red-700'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                <Compass className="h-4 w-4" aria-hidden="true" />
                Карта релизов A0 → B2
              </button>
            </nav>

            {/* Tab 1: Lessons, Quest, Final Test & Interference Log */}
            {activeTab === 'lessons' && (
              <div className="grid gap-6 lg:grid-cols-3">
                <div className="lg:col-span-2 space-y-4">
                  <h2 className="text-base font-bold text-slate-900">
                    Пошаговый маршрут Модуля {activeModule.releaseNumber} ({activeModule.level})
                  </h2>

                  {activeModule.lessons.map((lesson) => {
                    const doneRecord = completedItems[lesson.id];
                    return (
                      <article
                        key={lesson.id}
                        className="rounded-2xl border border-slate-200 bg-white p-5 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-slate-300 transition-all"
                      >
                        <div className="space-y-1.5">
                          <div className="flex items-center gap-2">
                            <span className="rounded-md bg-slate-100 px-2 py-0.5 text-xs font-bold text-slate-700">
                              Урок {lesson.number}
                            </span>
                            <span className="text-xs text-slate-500">
                              ~{lesson.estimatedMinutes} мин • {lesson.exercises.length} упр.
                            </span>
                            {doneRecord && (
                              <span className="inline-flex items-center gap-1 rounded-md bg-emerald-50 px-2 py-0.5 text-xs font-bold text-emerald-700 border border-emerald-200">
                                <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
                                Пройдено ({doneRecord.scorePercent}%)
                              </span>
                            )}
                          </div>
                          <h3 className="text-base sm:text-lg font-bold text-slate-900">
                            {lesson.titlePl}
                          </h3>
                          <p className="text-sm text-slate-600">{lesson.titleRu}</p>
                        </div>

                        <button
                          type="button"
                          onClick={() =>
                            setView({ mode: 'lesson', lessonId: lesson.id })
                          }
                          className="rounded-xl bg-slate-900 px-4 py-2.5 text-xs sm:text-sm font-bold text-white hover:bg-slate-800 shrink-0"
                        >
                          {doneRecord ? 'Повторить урок' : 'Начать урок →'}
                        </button>
                      </article>
                    );
                  })}

                  {/* Practical Quest Card */}
                  <article className="rounded-2xl border-2 border-amber-300 bg-amber-50/50 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center gap-1 rounded-md bg-amber-200/80 px-2 py-0.5 text-xs font-bold text-amber-950">
                          <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                          Практическая миссия в городе
                        </span>
                        {isQuestCompleted && (
                          <span className="inline-flex items-center gap-1 rounded-md bg-emerald-100 px-2 py-0.5 text-xs font-bold text-emerald-800">
                            <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
                            Миссия пройдена!
                          </span>
                        )}
                      </div>
                      <h3 className="text-base sm:text-lg font-bold text-slate-900">
                        {activeModule.quest.title}
                      </h3>
                      <p className="text-sm text-slate-700">
                        {activeModule.quest.descriptionRu}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => setView({ mode: 'quest' })}
                      className="rounded-xl bg-amber-600 px-4 py-2.5 text-xs sm:text-sm font-bold text-white hover:bg-amber-700 shrink-0"
                    >
                      Запустить миссию →
                    </button>
                  </article>

                  {/* Final Test Card */}
                  <article className="rounded-2xl border-2 border-red-200 bg-red-50/40 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center gap-1 rounded-md bg-red-100 px-2 py-0.5 text-xs font-bold text-red-800">
                          <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
                          Итоговый тест Модуля {activeModule.releaseNumber} (Порог{' '}
                          {activeModule.finalTest.passingScorePercent}%)
                        </span>
                        {isTestCompleted && (
                          <span className="inline-flex items-center gap-1 rounded-md bg-emerald-100 px-2 py-0.5 text-xs font-bold text-emerald-800">
                            <Award className="h-3.5 w-3.5" aria-hidden="true" />
                            Зачтено (
                            {completedItems[activeModule.finalTest.id]?.scorePercent}%)
                          </span>
                        )}
                      </div>
                      <h3 className="text-base sm:text-lg font-bold text-slate-900">
                        Контрольный срез Модуля {activeModule.releaseNumber} (
                        {activeModule.finalTest.exercises.length} заданий)
                      </h3>
                      <p className="text-sm text-slate-700">
                        Проверяет ключевую грамматику, словарь, ложные друзья и самостоятельное построение фраз.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => setView({ mode: 'final_test' })}
                      className="rounded-xl bg-red-600 px-4 py-2.5 text-xs sm:text-sm font-bold text-white hover:bg-red-700 shrink-0"
                    >
                      Пройти тест →
                    </button>
                  </article>
                </div>

                {/* Right Sidebar: Learning Objectives & Interference Radar */}
                <aside className="space-y-4">
                  <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-3">
                    <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500">
                      Цели Модуля {activeModule.releaseNumber}
                    </h2>
                    <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                      {activeModule.learningGoalsRu.map((goal, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2
                            className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5"
                            aria-hidden="true"
                          />
                          <span>{goal}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-3">
                    <div className="flex items-center justify-between">
                      <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500">
                        Радар калек и ловушек
                      </h2>
                      <AlertTriangle className="h-4 w-4 text-amber-600" aria-hidden="true" />
                    </div>
                    {interferenceLogs.length === 0 ? (
                      <p className="text-xs text-slate-600 leading-relaxed">
                        Пока не зафиксировано ошибок восточнославянской интерференции. Если при вводе ответа вы используете кальку (например, «pracowam» или «jestem programista»), она появится здесь.
                      </p>
                    ) : (
                      <ul className="space-y-2 text-xs">
                        {interferenceLogs.slice(0, 5).map((log, i) => (
                          <li
                            key={i}
                            className="rounded-lg border border-red-200 bg-red-50 p-2.5 text-red-900"
                          >
                            <span className="font-bold block">{log.tag}:</span>
                            <span>Ваш ввод: «{log.userInput}»</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </aside>
              </div>
            )}

            {/* Tab 2: Vocabulary with Neural Polish TTS */}
            {activeTab === 'vocab' && (
              <section className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <h2 className="text-lg font-bold text-slate-900">
                      Словарь Модуля {activeModule.releaseNumber} с нейроголосами
                    </h2>
                    <p className="text-xs text-slate-500">
                      Нажмите на кнопку динамика, чтобы прослушать эталонное польское произношение и ударение.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setView({ mode: 'srs_session' })}
                    className="rounded-xl bg-red-600 px-4 py-2 text-xs font-bold text-white hover:bg-red-700"
                  >
                    Тренировать в SRS →
                  </button>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  {activeModule.vocabulary.map((item) => {
                    const card = srsCards[item.id];
                    return (
                      <article
                        key={item.id}
                        className="rounded-2xl border border-slate-200 bg-white p-4 space-y-2 shadow-2xs"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h3 className="text-base font-extrabold text-slate-900">
                              {item.pl}
                            </h3>
                            <p className="text-xs font-mono text-slate-500">
                              [{item.pronunciationHint}]
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() => playPolishAudio(item.audioUrl, item.pl, false)}
                            aria-label={`Прослушать ${item.pl}`}
                            className="inline-flex items-center gap-1 rounded-lg bg-red-50 px-2.5 py-1.5 text-xs font-bold text-red-700 border border-red-200 hover:bg-red-100"
                          >
                            <Volume2 className="h-4 w-4" aria-hidden="true" />
                            Аудио
                          </button>
                        </div>

                        <p className="text-sm font-semibold text-emerald-800">{item.ru}</p>

                        {item.falseFriendWarning && (
                          <p className="rounded-lg border border-amber-200 bg-amber-50 px-2.5 py-1.5 text-xs font-medium text-amber-900">
                            ⚠️ {item.falseFriendWarning}
                          </p>
                        )}

                        {item.governmentHint && (
                          <p className="text-xs text-slate-600 font-medium">
                            📌 {item.governmentHint}
                          </p>
                        )}

                        <div className="rounded-lg bg-slate-50 p-2.5 border border-slate-100 text-xs space-y-0.5">
                          <p className="font-semibold text-slate-800">
                            «{item.examples[0]?.pl}»
                          </p>
                          <p className="text-slate-500">{item.examples[0]?.ru}</p>
                        </div>

                        <div className="flex items-center justify-between pt-1 text-[11px] text-slate-500">
                          <span>
                            Статус SRS:{' '}
                            <strong className="text-slate-700">
                              {card?.stage === 'production'
                                ? 'Ступень 2 (Морфология)'
                                : 'Ступень 1 (Узнавание)'}
                            </strong>
                          </span>
                          <span>Интервал: {card?.intervalDays ?? 0} дн.</span>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </section>
            )}

            {/* Tab 3: Bi-Weekly Release Roadmap A0 -> B2 */}
            {activeTab === 'roadmap' && (
              <section className="space-y-4">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">
                    Дорожная карта двухнедельных релизов: от A0 до сертификата B1 (Rezydent UE) и B2
                  </h2>
                  <p className="text-xs text-slate-600">
                    Выберите любой открытый модуль, чтобы перейти к его урокам и миссиям.
                  </p>
                </div>

                <div className="space-y-3">
                  {COURSE_ROADMAP.map((item) => (
                    <article
                      key={item.moduleId}
                      className={`rounded-2xl border p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                        item.status === 'available'
                          ? 'border-red-300 bg-white shadow-xs'
                          : item.examMilestone
                          ? 'border-amber-300 bg-amber-50/40'
                          : 'border-slate-200 bg-white/70 opacity-85'
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="rounded-md bg-slate-900 px-2 py-0.5 text-xs font-bold text-white">
                            Релиз #{item.releaseNumber}
                          </span>
                          <span className="rounded-md bg-red-100 px-2 py-0.5 text-xs font-bold text-red-800">
                            Уровень {item.level}
                          </span>
                          {item.examMilestone === 'B1_CERT' && (
                            <span className="rounded-md bg-amber-200 px-2 py-0.5 text-xs font-extrabold text-amber-950">
                              🎯 Цель №1: Сертификат для Rezydenta UE (B1)
                            </span>
                          )}
                          {item.examMilestone === 'B2_CERT' && (
                            <span className="rounded-md bg-emerald-200 px-2 py-0.5 text-xs font-extrabold text-emerald-950">
                              🏆 Цель №2: Госэкзамен Państwowej Komisji B2
                            </span>
                          )}
                        </div>
                        <h3 className="text-base font-bold text-slate-900">
                          {item.titlePl}
                        </h3>
                        <p className="text-sm text-slate-700">{item.titleRu}</p>
                        <p className="text-xs text-slate-500">
                          <strong>Грамматика:</strong> {item.grammarFocus} •{' '}
                          <strong>Ситуация в Польше:</strong> {item.realLifeScenario}
                        </p>
                      </div>

                      {item.status === 'available' ? (
                        <button
                          type="button"
                          onClick={() => {
                            selectModule(item.moduleId);
                            setActiveTab('lessons');
                          }}
                          className="rounded-xl bg-red-600 px-4 py-2 text-xs font-bold text-white hover:bg-red-700 shrink-0"
                        >
                          {selectedModuleId === item.moduleId
                            ? 'Активен сейчас'
                            : 'Открыть модуль →'}
                        </button>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-100 px-3.5 py-2 text-xs font-semibold text-slate-500 shrink-0">
                          <Lock className="h-3.5 w-3.5" aria-hidden="true" />В плане релизов
                        </span>
                      )}
                    </article>
                  ))}
                </div>
              </section>
            )}
          </div>
        )}
      </main>

      <GrammarDialog
        isOpen={isGrammarOpen}
        onClose={() => setIsGrammarOpen(false)}
      />

      <ProfileModal />
    </div>
  );
}
