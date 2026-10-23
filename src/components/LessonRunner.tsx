'use client';

import React, { useState } from 'react';
import {
  ArrowLeft,
  BookOpen,
  Volume2,
  CheckCircle2,
  Award,
  Sparkles,
  MessageSquare,
} from 'lucide-react';
import { MODULE_A0_01 } from '@/content/modules/mod-a0-01';
import { ExerciseCard } from './ExerciseCard';
import { playPolishAudio } from '@/lib/audio';
import { useAppStore } from '@/store/useAppStore';

interface LessonRunnerProps {
  lessonId: string;
  onOpenGrammar: () => void;
}

export function LessonRunner({ lessonId, onOpenGrammar }: LessonRunnerProps) {
  const { setView, markItemCompleted } = useAppStore();
  const lesson = MODULE_A0_01.lessons.find((l) => l.id === lessonId) ?? MODULE_A0_01.lessons[0];

  const [phase, setPhase] = useState<'theory' | 'exercises' | 'completed'>('theory');
  const [currentExIndex, setCurrentExIndex] = useState(0);
  const [firstTryCorrectCount, setFirstTryCorrectCount] = useState(0);

  const currentExercise = lesson.exercises[currentExIndex];

  const handleExerciseComplete = async (wasCorrectFirstTry: boolean) => {
    const nextCorrect = firstTryCorrectCount + (wasCorrectFirstTry ? 1 : 0);
    setFirstTryCorrectCount(nextCorrect);

    if (currentExIndex + 1 < lesson.exercises.length) {
      setCurrentExIndex(currentExIndex + 1);
    } else {
      const scorePercent = Math.round((nextCorrect / lesson.exercises.length) * 100);
      await markItemCompleted(lesson.id, 'lesson', scorePercent);
      setPhase('completed');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => setView({ mode: 'dashboard' })}
          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          К карте Модуля 1
        </button>

        <button
          type="button"
          onClick={onOpenGrammar}
          className="inline-flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-3.5 py-2 text-xs font-semibold text-red-800 hover:bg-red-100"
        >
          <Sparkles className="h-4 w-4 text-red-600" aria-hidden="true" />
          Шпаргалка Pan/Pani и ловушки
        </button>
      </div>

      {/* Header */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-2xs space-y-2">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-red-600">
          <span>Урок {lesson.number}</span>
          <span>•</span>
          <span>~{lesson.estimatedMinutes} мин</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900">{lesson.titlePl}</h1>
        <p className="text-sm text-slate-600">{lesson.titleRu}</p>
      </div>

      {phase === 'theory' && (
        <div className="space-y-6">
          {/* Theory block */}
          <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-2xs space-y-5">
            <div className="flex items-center gap-2.5">
              <BookOpen className="h-5 w-5 text-red-600" aria-hidden="true" />
              <h2 className="text-lg font-bold text-slate-900">{lesson.theory.title}</h2>
            </div>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
              {lesson.theory.summaryRu}
            </p>

            <div className="space-y-4">
              {lesson.theory.keyRules.map((rule, idx) => (
                <article
                  key={idx}
                  className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-2.5"
                >
                  <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                    {rule.ruleTitle}
                  </h3>
                  <p className="text-sm text-slate-700 leading-relaxed">{rule.explanationRu}</p>
                  <div className="grid gap-2 sm:grid-cols-2 pt-1 text-xs sm:text-sm">
                    {rule.wrongExample && (
                      <div className="rounded-lg border border-red-200 bg-red-50/80 px-3 py-2 text-red-900">
                        <span className="font-bold block text-red-700">❌ Неверно (калька):</span>
                        <span className="line-through">{rule.wrongExample}</span>
                      </div>
                    )}
                    <div className="rounded-lg border border-emerald-200 bg-emerald-50/80 px-3 py-2 text-emerald-950">
                      <span className="font-bold block text-emerald-700">✅ По-польски:</span>
                      <span className="font-semibold">{rule.correctExample}</span>
                      <span className="block text-xs text-slate-600 mt-0.5">
                        ({rule.translationRu})
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {lesson.theory.table && (
              <div className="overflow-x-auto rounded-xl border border-slate-200">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-slate-100 font-semibold text-slate-700">
                    <tr>
                      {lesson.theory.table.headers.map((h, i) => (
                        <th key={i} className="px-3.5 py-2.5">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 bg-white">
                    {lesson.theory.table.rows.map((row, rIdx) => (
                      <tr key={rIdx}>
                        {row.map((cell, cIdx) => (
                          <td
                            key={cIdx}
                            className={`px-3.5 py-2.5 ${
                              cIdx === 0 ? 'font-semibold text-slate-900' : 'text-slate-700'
                            }`}
                          >
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>

          {/* Optional Dialogue Block */}
          {lesson.dialogue && (
            <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-2xs space-y-4">
              <div className="flex items-center gap-2.5">
                <MessageSquare className="h-5 w-5 text-red-600" aria-hidden="true" />
                <div>
                  <h2 className="text-lg font-bold text-slate-900">{lesson.dialogue.title}</h2>
                  <p className="text-xs text-slate-500">{lesson.dialogue.contextRu}</p>
                </div>
              </div>

              <div className="space-y-3">
                {lesson.dialogue.lines.map((line, idx) => (
                  <div
                    key={idx}
                    className={`rounded-xl border p-3.5 space-y-1.5 ${
                      line.role === 'user'
                        ? 'border-red-200 bg-red-50/40 ml-4 sm:ml-8'
                        : 'border-slate-200 bg-slate-50 mr-4 sm:mr-8'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                        {line.speaker}
                      </span>
                      <button
                        type="button"
                        onClick={() => playPolishAudio(line.audioUrl, line.pl, false)}
                        className="inline-flex items-center gap-1 rounded-md bg-white px-2.5 py-1 text-xs font-semibold text-red-700 border border-slate-200 hover:bg-red-50"
                      >
                        <Volume2 className="h-3.5 w-3.5" aria-hidden="true" />
                        Слушать
                      </button>
                    </div>
                    <p className="text-base font-bold text-slate-900">{line.pl}</p>
                    {line.pronunciationHint && (
                      <p className="text-xs font-mono text-slate-500">
                        [{line.pronunciationHint}]
                      </p>
                    )}
                    <p className="text-sm text-slate-700">{line.ru}</p>
                    {line.grammarNote && (
                      <p className="text-xs text-amber-800 bg-amber-50 rounded-md px-2 py-1 border border-amber-200">
                        💡 {line.grammarNote}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => setPhase('exercises')}
              className="rounded-xl bg-red-600 px-6 py-3 text-sm font-bold text-white shadow-sm hover:bg-red-700 transition-colors"
            >
              Перейти к практике ({lesson.exercises.length} упражнений) →
            </button>
          </div>
        </div>
      )}

      {phase === 'exercises' && currentExercise && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-600">
            <span>
              Упражнение {currentExIndex + 1} из {lesson.exercises.length}
            </span>
            <button
              type="button"
              onClick={() => setPhase('theory')}
              className="text-red-700 hover:underline"
            >
              Вернуться к теории урока
            </button>
          </div>
          <progress
            value={currentExIndex + 1}
            max={lesson.exercises.length}
            className="h-2 w-full overflow-hidden rounded-full bg-slate-200 accent-red-600"
          />

          <ExerciseCard
            key={currentExercise.id}
            exercise={currentExercise}
            onComplete={handleExerciseComplete}
          />
        </div>
      )}

      {phase === 'completed' && (
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50/70 p-6 sm:p-8 text-center space-y-4">
          <Award className="h-12 w-12 text-emerald-600 mx-auto" aria-hidden="true" />
          <h2 className="text-2xl font-bold text-slate-900">
            Урок {lesson.number} успешно пройден!
          </h2>
          <p className="text-sm text-slate-700 max-w-md mx-auto">
            Точность с первой попытки:{' '}
            <strong>
              {Math.round((firstTryCorrectCount / lesson.exercises.length) * 100)}%
            </strong>
            . Прогресс сохранён в локальной базе данных.
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => setView({ mode: 'dashboard' })}
              className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-bold text-white hover:bg-slate-800"
            >
              <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
              Вернуться к карте курса
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
