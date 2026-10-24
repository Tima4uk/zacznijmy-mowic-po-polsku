'use client';

import React, { useState } from 'react';
import { ArrowLeft, Award, ShieldCheck, RotateCcw } from 'lucide-react';
import { getModuleById } from '@/content/modules';
import { ExerciseCard } from './ExerciseCard';
import { useAppStore } from '@/store/useAppStore';

export function FinalTestRunner() {
  const { selectedModuleId, setView, markItemCompleted } = useAppStore();
  const activeModule = getModuleById(selectedModuleId);
  const test = activeModule.finalTest;

  const [exIndex, setExIndex] = useState(0);
  const [correctFirstTry, setCorrectFirstTry] = useState(0);
  const [finishedScore, setFinishedScore] = useState<number | null>(null);

  const exercise = test.exercises[exIndex];

  const handleComplete = async (wasFirstTry: boolean) => {
    const nextCorrect = correctFirstTry + (wasFirstTry ? 1 : 0);
    setCorrectFirstTry(nextCorrect);

    if (exIndex + 1 < test.exercises.length) {
      setExIndex(exIndex + 1);
    } else {
      const pct = Math.round((nextCorrect / test.exercises.length) * 100);
      setFinishedScore(pct);
      if (pct >= test.passingScorePercent) {
        await markItemCompleted(test.id, 'test', pct);
      }
    }
  };

  return (
    <div className="space-y-6">
      <button
        type="button"
        onClick={() => setView({ mode: 'dashboard' })}
        className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        К карте Модуля 1
      </button>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 space-y-2">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-red-600">
          <ShieldCheck className="h-4 w-4" aria-hidden="true" />
          <span>Итоговый контроль Модуля 1 (Порог сдачи: {test.passingScorePercent}%)</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
          Рубежный тест A0 → A1.1
        </h1>
        <p className="text-sm text-slate-600">
          Для зачёта модуля необходимо ответить с первой попытки минимум на{' '}
          {test.passingScorePercent}% заданий.
        </p>
      </div>

      {finishedScore === null && exercise && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-600">
            <span>
              Задание {exIndex + 1} из {test.exercises.length}
            </span>
          </div>
          <progress
            value={exIndex + 1}
            max={test.exercises.length}
            className="h-2 w-full overflow-hidden rounded-full bg-slate-200 accent-red-600"
          />
          <ExerciseCard
            key={exercise.id}
            exercise={exercise}
            onComplete={handleComplete}
          />
        </div>
      )}

      {finishedScore !== null && (
        <div
          className={`rounded-2xl border p-6 sm:p-8 text-center space-y-4 ${
            finishedScore >= test.passingScorePercent
              ? 'border-emerald-300 bg-emerald-50'
              : 'border-amber-300 bg-amber-50'
          }`}
        >
          <Award
            className={`h-12 w-12 mx-auto ${
              finishedScore >= test.passingScorePercent ? 'text-emerald-600' : 'text-amber-600'
            }`}
            aria-hidden="true"
          />
          <h2 className="text-2xl font-bold text-slate-900">
            Ваш результат с первой попытки: {finishedScore}%
          </h2>
          <p className="text-sm text-slate-700 max-w-md mx-auto">
            {finishedScore >= test.passingScorePercent
              ? 'Поздравляем! Вы уверенно освоили Модуль 1 и готовы к переходу на следующий двухнедельный релиз (Модуль 2: Czas teraźniejszy i Narzędnik).'
              : `Для официального зачёта модуля требуется минимум ${test.passingScorePercent}%. Рекомендуем повторить карточки SRS и пройти тест ещё раз.`}
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            {finishedScore < test.passingScorePercent && (
              <button
                type="button"
                onClick={() => {
                  setExIndex(0);
                  setCorrectFirstTry(0);
                  setFinishedScore(null);
                }}
                className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-red-700"
              >
                <RotateCcw className="h-4 w-4" aria-hidden="true" />
                Пройти тест заново
              </button>
            )}
            <button
              type="button"
              onClick={() => setView({ mode: 'dashboard' })}
              className="rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-bold text-white hover:bg-slate-800"
            >
              На главный экран
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
