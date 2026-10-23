'use client';

import React, { useState } from 'react';
import { ArrowLeft, MapPin, Volume2, Award } from 'lucide-react';
import { MODULE_A0_01 } from '@/content/modules/mod-a0-01';
import { ExerciseCard } from './ExerciseCard';
import { playPolishAudio } from '@/lib/audio';
import { useAppStore } from '@/store/useAppStore';

export function QuestRunner() {
  const { setView, markItemCompleted } = useAppStore();
  const quest = MODULE_A0_01.quest;

  const [stepIdx, setStepIdx] = useState(0);
  const [firstTryCount, setFirstTryCount] = useState(0);
  const [isDone, setIsDone] = useState(false);

  const step = quest.steps[stepIdx];

  const handleStepComplete = async (wasFirstTry: boolean) => {
    const nextCorrect = firstTryCount + (wasFirstTry ? 1 : 0);
    setFirstTryCount(nextCorrect);

    if (stepIdx + 1 < quest.steps.length) {
      setStepIdx(stepIdx + 1);
    } else {
      const score = Math.round((nextCorrect / quest.steps.length) * 100);
      await markItemCompleted(quest.id, 'quest', score);
      setIsDone(true);
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

      <div className="rounded-2xl border border-amber-300 bg-amber-50/70 p-5 sm:p-6 space-y-2">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-800">
          <MapPin className="h-4 w-4 text-amber-700" aria-hidden="true" />
          <span>{quest.locationName}</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900">{quest.title}</h1>
        <p className="text-sm text-slate-700">{quest.descriptionRu}</p>
      </div>

      {!isDone && step && (
        <div className="space-y-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-3">
            <h2 className="text-base font-bold text-slate-900">{step.stepTitle}</h2>
            <p className="text-sm text-slate-700 leading-relaxed">{step.situationRu}</p>

            {step.npcLinePl && (
              <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-slate-50 p-3.5 border border-slate-200">
                <div>
                  <span className="text-xs font-bold uppercase text-slate-500 block">
                    Urzędniczka (Инспектор):
                  </span>
                  <p className="text-base font-bold text-slate-900">«{step.npcLinePl}»</p>
                </div>
                <button
                  type="button"
                  onClick={() => playPolishAudio(step.npcAudioUrl, step.npcLinePl, false)}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-red-600 px-3 py-2 text-xs font-semibold text-white hover:bg-red-700"
                >
                  <Volume2 className="h-4 w-4" aria-hidden="true" />
                  Слушать реплику
                </button>
              </div>
            )}
          </div>

          <ExerciseCard
            key={step.exercise.id}
            exercise={step.exercise}
            onComplete={handleStepComplete}
          />
        </div>
      )}

      {isDone && (
        <div className="rounded-2xl border border-emerald-300 bg-emerald-50 p-6 sm:p-8 text-center space-y-4">
          <Award className="h-12 w-12 text-emerald-600 mx-auto" aria-hidden="true" />
          <h2 className="text-2xl font-bold text-slate-900">
            Миссия выполнена: Номер PESEL получен!
          </h2>
          <p className="text-sm text-slate-700 max-w-md mx-auto">
            Вы успешно сориентировались в терминале Urząd Miasta, вежливо пообщались с инспектором и проверили свои данные без единой русифицированной кальки.
          </p>
          <button
            type="button"
            onClick={() => setView({ mode: 'dashboard' })}
            className="rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-bold text-white hover:bg-slate-800"
          >
            Вернуться к модулю
          </button>
        </div>
      )}
    </div>
  );
}
