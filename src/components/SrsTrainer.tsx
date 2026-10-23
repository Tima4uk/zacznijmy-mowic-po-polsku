'use client';

import React, { useState } from 'react';
import {
  ArrowLeft,
  Volume2,
  Brain,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
} from 'lucide-react';
import { MODULE_A0_01 } from '@/content/modules/mod-a0-01';
import { useAppStore } from '@/store/useAppStore';
import { playPolishAudio } from '@/lib/audio';
import { validatePolishAnswer } from '@/lib/validator';
import { SrsRating } from '@/lib/srs';

const POLISH_KEYS = ['ą', 'ć', 'ę', 'ł', 'ń', 'ó', 'ś', 'ź', 'ż'];

export function SrsTrainer() {
  const { setView, srsCards, reviewSrsCard } = useAppStore();

  const vocabList = MODULE_A0_01.vocabulary;
  const [cardIndex, setCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [morphInput, setMorphInput] = useState('');
  const [morphChecked, setMorphChecked] = useState<{
    isCorrect: boolean;
    isWarning: boolean;
    message: string;
  } | null>(null);
  const [sessionDone, setSessionDone] = useState(false);

  const currentVocab = vocabList[cardIndex];
  const cardState = currentVocab ? srsCards[currentVocab.id] : undefined;
  const stage = cardState?.stage ?? 'recognition';

  const handleNextCard = async (rating: SrsRating) => {
    if (!currentVocab) return;
    await reviewSrsCard(currentVocab.id, rating);

    setIsFlipped(false);
    setMorphInput('');
    setMorphChecked(null);

    if (cardIndex + 1 < vocabList.length) {
      setCardIndex(cardIndex + 1);
    } else {
      setSessionDone(true);
    }
  };

  const handleMorphCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentVocab || !morphInput.trim()) return;

    const res = validatePolishAnswer(morphInput, currentVocab.srsAcceptedAnswers);
    setMorphChecked({
      isCorrect: res.isCorrect,
      isWarning: res.isDiacriticWarning,
      message: res.isCorrect
        ? res.diacriticFeedbackRu ?? `Верно! «${currentVocab.srsAcceptedAnswers[0]}»`
        : `Правильная форма: «${currentVocab.srsAcceptedAnswers[0]}»`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => setView({ mode: 'dashboard' })}
          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          На главный экран
        </button>

        <span className="text-xs font-bold text-slate-500">
          Карточка {Math.min(cardIndex + 1, vocabList.length)} из {vocabList.length}
        </span>
      </div>

      {!sessionDone && currentVocab && (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-7 shadow-xs space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
            <span className="inline-flex items-center gap-1.5 rounded-md bg-red-50 px-2.5 py-1 text-xs font-bold text-red-700 border border-red-200">
              <Brain className="h-3.5 w-3.5" aria-hidden="true" />
              {stage === 'recognition'
                ? 'Ступень 1: Пассивное узнавание'
                : 'Ступень 2: Активная морфология в контексте'}
            </span>
            <span className="text-xs text-slate-500">
              Текущий интервал: {cardState?.intervalDays ?? 0} дн.
            </span>
          </div>

          {stage === 'recognition' ? (
            <div className="space-y-5 text-center py-4">
              <div className="space-y-2">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                  {currentVocab.pl}
                </h2>
                <p className="text-sm font-mono text-slate-500">
                  [{currentVocab.pronunciationHint}]
                </p>
                <button
                  type="button"
                  onClick={() =>
                    playPolishAudio(currentVocab.audioUrl, currentVocab.pl, false)
                  }
                  className="inline-flex items-center gap-1.5 rounded-lg bg-slate-100 px-3.5 py-1.5 text-xs font-semibold text-slate-800 hover:bg-slate-200"
                >
                  <Volume2 className="h-4 w-4 text-red-600" aria-hidden="true" />
                  Прослушать произношение
                </button>
              </div>

              {!isFlipped ? (
                <div className="pt-4">
                  <button
                    type="button"
                    onClick={() => setIsFlipped(true)}
                    className="rounded-xl bg-slate-900 px-6 py-3 text-sm font-bold text-white hover:bg-slate-800"
                  >
                    Показать перевод и контекст
                  </button>
                </div>
              ) : (
                <div className="space-y-4 border-t border-slate-100 pt-5 text-left">
                  <div className="text-center space-y-1">
                    <p className="text-lg font-bold text-emerald-800">{currentVocab.ru}</p>
                    {currentVocab.falseFriendWarning && (
                      <p className="text-xs font-semibold text-amber-900 bg-amber-50 border border-amber-200 rounded-lg px-3 py-1.5 inline-block">
                        ⚠️ {currentVocab.falseFriendWarning}
                      </p>
                    )}
                  </div>

                  <div className="rounded-xl bg-slate-50 p-3.5 border border-slate-200 space-y-1">
                    <p className="text-sm font-bold text-slate-900">
                      «{currentVocab.examples[0]?.pl}»
                    </p>
                    <p className="text-xs text-slate-600">{currentVocab.examples[0]?.ru}</p>
                  </div>

                  <div className="grid grid-cols-3 gap-2.5 pt-2">
                    <button
                      type="button"
                      onClick={() => handleNextCard('again')}
                      className="rounded-xl border border-red-200 bg-red-50 py-2.5 text-xs font-bold text-red-800 hover:bg-red-100"
                    >
                      Снова (Забыл)
                    </button>
                    <button
                      type="button"
                      onClick={() => handleNextCard('good')}
                      className="rounded-xl bg-emerald-600 py-2.5 text-xs font-bold text-white hover:bg-emerald-700"
                    >
                      Помню (На Ступень 2 →)
                    </button>
                    <button
                      type="button"
                      onClick={() => handleNextCard('easy')}
                      className="rounded-xl border border-emerald-200 bg-emerald-50 py-2.5 text-xs font-bold text-emerald-800 hover:bg-emerald-100"
                    >
                      Легко (3 дня)
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Ступень 2: Активный морфологический ввод в предложении */
            <form onSubmit={handleMorphCheck} className="space-y-5">
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase text-slate-500">
                  Значение: {currentVocab.ru}
                </span>
                <p className="text-base sm:text-lg font-semibold text-slate-900">
                  Вставьте слово в правильной грамматической форме ({currentVocab.srsBaseHint}):
                </p>
              </div>

              <div className="rounded-xl bg-slate-50 p-4 border border-slate-200 text-base sm:text-lg leading-loose text-slate-900">
                {currentVocab.srsPromptSentence.split('{{0}}').map((chunk, i, arr) => (
                  <React.Fragment key={i}>
                    <span>{chunk}</span>
                    {i < arr.length - 1 && (
                      <input
                        type="text"
                        value={morphInput}
                        onChange={(e) => {
                          setMorphInput(e.target.value);
                          setMorphChecked(null);
                        }}
                        placeholder={currentVocab.srsBaseHint}
                        aria-label={currentVocab.srsBaseHint}
                        className="mx-1.5 w-44 rounded-lg border-2 border-slate-300 bg-white px-2.5 py-1 text-base font-bold text-red-700 focus:border-red-600 focus:outline-none"
                      />
                    )}
                  </React.Fragment>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-xs text-slate-500 mr-1">Польские буквы:</span>
                {POLISH_KEYS.map((ch) => (
                  <button
                    key={ch}
                    type="button"
                    onClick={() => setMorphInput((prev) => prev + ch)}
                    className="h-8 w-8 rounded-lg border border-slate-300 bg-slate-50 text-sm font-semibold text-slate-800 hover:bg-red-50"
                  >
                    {ch}
                  </button>
                ))}
              </div>

              {morphChecked && (
                <div
                  className={`rounded-xl border p-3.5 flex items-center gap-2.5 text-sm ${
                    morphChecked.isCorrect
                      ? 'border-emerald-300 bg-emerald-50 text-emerald-950'
                      : 'border-red-300 bg-red-50 text-red-950'
                  }`}
                >
                  {morphChecked.isCorrect ? (
                    <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" aria-hidden="true" />
                  ) : (
                    <AlertTriangle className="h-5 w-5 text-red-600 shrink-0" aria-hidden="true" />
                  )}
                  <span className="font-semibold">{morphChecked.message}</span>
                </div>
              )}

              {!morphChecked ? (
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-bold text-white hover:bg-slate-800"
                  >
                    Проверить форму
                  </button>
                </div>
              ) : (
                <div className="flex justify-end gap-2.5">
                  {morphChecked.isCorrect ? (
                    <button
                      type="button"
                      onClick={() => handleNextCard('good')}
                      className="rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-emerald-700"
                    >
                      Далее (Увеличить интервал) →
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleNextCard('again')}
                      className="rounded-xl bg-red-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-red-700"
                    >
                      Повторить позже →
                    </button>
                  )}
                </div>
              )}
            </form>
          )}
        </div>
      )}

      {sessionDone && (
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 sm:p-8 text-center space-y-4">
          <Sparkles className="h-10 w-10 text-emerald-600 mx-auto" aria-hidden="true" />
          <h2 className="text-xl font-bold text-slate-900">
            Сессия интервального повторения завершена!
          </h2>
          <p className="text-sm text-slate-700 max-w-md mx-auto">
            Все 12 карточек Модуля 1 обновлены в вашей локальной базе IndexedDB. Карточки со Ступени 1 переведены в режим активной морфологии.
          </p>
          <button
            type="button"
            onClick={() => setView({ mode: 'dashboard' })}
            className="rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-bold text-white hover:bg-slate-800"
          >
            Вернуться на главный экран
          </button>
        </div>
      )}
    </div>
  );
}
