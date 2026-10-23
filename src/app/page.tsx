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
} from 'lucide-react';
import { MODULE_A0_01 } from '@/content/modules/mod-a0-01';
import { COURSE_ROADMAP } from '@/content/roadmap';
import { useAppStore } from '@/store/useAppStore';
import { LessonRunner } from '@/components/LessonRunner';
import { QuestRunner } from '@/components/QuestRunner';
import { FinalTestRunner } from '@/components/FinalTestRunner';
import { SrsTrainer } from '@/components/SrsTrainer';
import { GrammarDialog } from '@/components/GrammarDialog';
import { playPolishAudio } from '@/lib/audio';

export default function HomePage() {
  const {
    isHydrated,
    hydrateFromDb,
    activeView,
    setView,
    completedItems,
    srsCards,
    interferenceLogs,
    streakDays,
    totalExercisesSolved,
    correctFirstTryCount,
  } = useAppStore();

  const [isGrammarOpen, setIsGrammarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'module1' | 'vocab' | 'roadmap'>('module1');

  useEffect(() => {
    hydrateFromDb();
  }, [hydrateFromDb]);

  const accuracyPercent =
    totalExercisesSolved > 0
      ? Math.round((correctFirstTryCount / totalExercisesSolved) * 100)
      : 100;

  const srsCardsArray = Object.values(srsCards);
  const productionStageCount = srsCardsArray.filter(
    (c) => c.stage === 'production'
  ).length;

  const completedLessonsCount = MODULE_A0_01.lessons.filter(
    (l) => Boolean(completedItems[l.id])
  ).length;
  const isQuestCompleted = Boolean(completedItems[MODULE_A0_01.quest.id]);
  const isTestCompleted = Boolean(completedItems[MODULE_A0_01.finalTest.id]);

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
                Путь A0 → B1 (Rezydent UE) → B2 • Релиз 1 (v0.1.0)
              </span>
            </div>
          </button>

          <div className="flex items-center gap-2 sm:gap-3">
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
            {/* Hero / Metrics Banner */}
            <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-2xs space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-2 rounded-md bg-red-50 px-2.5 py-1 text-xs font-bold text-red-700 border border-red-200">
                    <span>Активный Модуль 1 • Уровень {MODULE_A0_01.level}</span>
                  </div>
                  <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                    {MODULE_A0_01.titlePl}
                  </h1>
                  <p className="text-sm text-slate-600 max-w-2xl">
                    {MODULE_A0_01.subtitleRu}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setView({ mode: 'srs_session' })}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-3 text-sm font-bold text-white shadow-xs hover:bg-red-700 transition-colors shrink-0"
                >
                  <Brain className="h-4 w-4" aria-hidden="true" />
                  Тренировка слов SRS ({MODULE_A0_01.vocabulary.length})
                </button>
              </div>

              {/* Measurable Learning Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-3.5">
                  <span className="text-xs font-medium text-slate-500 block">
                    Прогресс Модуля 1
                  </span>
                  <span className="text-lg font-extrabold text-slate-900">
                    {completedLessonsCount} / {MODULE_A0_01.lessons.length} уроков
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
                    {productionStageCount} / {MODULE_A0_01.vocabulary.length} слов
                  </span>
                </div>

                <div className="rounded-xl border border-slate-200 bg-slate-50 p-3.5">
                  <span className="text-xs font-medium text-slate-500 block">
                    Цель сертификации
                  </span>
                  <span className="text-sm font-bold text-red-700 block mt-0.5">
                    B1 (Rezydent UE) → B2
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
                onClick={() => setActiveTab('module1')}
                className={`inline-flex items-center gap-2 border-b-2 px-4 py-2.5 text-sm font-bold transition-colors ${
                  activeTab === 'module1'
                    ? 'border-red-600 text-red-700'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                <BookOpen className="h-4 w-4" aria-hidden="true" />
                Уроки и Миссия Модуля 1
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
                Словарь с озвучкой ({MODULE_A0_01.vocabulary.length})
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

            {/* Tab 1: Module 1 Lessons, Quest, Final Test & Interference Log */}
            {activeTab === 'module1' && (
              <div className="grid gap-6 lg:grid-cols-3">
                <div className="lg:col-span-2 space-y-4">
                  <h2 className="text-base font-bold text-slate-900">
                    Пошаговый маршрут Модуля 1 (Релиз 1)
                  </h2>

                  {MODULE_A0_01.lessons.map((lesson) => {
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
                            PESEL получен!
                          </span>
                        )}
                      </div>
                      <h3 className="text-base sm:text-lg font-bold text-slate-900">
                        {MODULE_A0_01.quest.title}
                      </h3>
                      <p className="text-sm text-slate-700">
                        {MODULE_A0_01.quest.descriptionRu}
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
                          Итоговый тест Модуля 1 (Порог 80%)
                        </span>
                        {isTestCompleted && (
                          <span className="inline-flex items-center gap-1 rounded-md bg-emerald-100 px-2 py-0.5 text-xs font-bold text-emerald-800">
                            <Award className="h-3.5 w-3.5" aria-hidden="true" />
                            Зачтено ({completedItems[MODULE_A0_01.finalTest.id]?.scorePercent}%)
                          </span>
                        )}
                      </div>
                      <h3 className="text-base sm:text-lg font-bold text-slate-900">
                        Контрольный срез A0 → A1.1 ({MODULE_A0_01.finalTest.exercises.length} заданий)
                      </h3>
                      <p className="text-sm text-slate-700">
                        Проверяет вежливый регистр Pan/Pani, спряжение глагола być, «ложных друзей» и письменный перевод.
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
                      Цели Модуля 1
                    </h2>
                    <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                      {MODULE_A0_01.learningGoalsRu.map((goal, idx) => (
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
                        Пока не зафиксировано ни одной ошибки восточнославянской интерференции. Если при вводе ответа вы используете кальку (например, «wy mówicie» или пропустите «jestem»), она появится здесь для прицельной проработки.
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
                      Словарь Модуля 1 с нейроголосами (pl-PL-ZofiaNeural / MarekNeural)
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
                    Тренировать все в SRS →
                  </button>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  {MODULE_A0_01.vocabulary.map((item) => {
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
                    Каждые 2 недели в приложение добавляется следующий модуль и новые механики.
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
                          onClick={() => setActiveTab('module1')}
                          className="rounded-xl bg-red-600 px-4 py-2 text-xs font-bold text-white hover:bg-red-700 shrink-0"
                        >
                          Открыт сейчас
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
    </div>
  );
}
