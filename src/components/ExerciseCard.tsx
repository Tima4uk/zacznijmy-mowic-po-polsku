'use client';

import React, { useState } from 'react';
import {
  Volume2,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  ArrowRight,
  RotateCcw,
} from 'lucide-react';
import { Exercise } from '@/types/curriculum';
import { validatePolishAnswer } from '@/lib/validator';
import { playPolishAudio } from '@/lib/audio';
import { useAppStore } from '@/store/useAppStore';

const POLISH_DIACRITIC_KEYS = ['ą', 'ć', 'ę', 'ł', 'ń', 'ó', 'ś', 'ź', 'ż'];

interface ExerciseCardProps {
  exercise: Exercise;
  onComplete: (wasCorrectFirstTry: boolean) => void;
}

export function ExerciseCard({ exercise, onComplete }: ExerciseCardProps) {
  const { recordAttempt, logInterferenceError } = useAppStore();

  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [clozeValues, setClozeValues] = useState<string[]>(
    exercise.type === 'cloze_input' ? exercise.blanks.map(() => '') : []
  );
  const [activeBlankIndex, setActiveBlankIndex] = useState<number>(0);
  const [selectedTokens, setSelectedTokens] = useState<string[]>([]);
  const [freeInput, setFreeInput] = useState<string>('');

  const [hasAttemptedOnce, setHasAttemptedOnce] = useState(false);
  const [wasFirstTrySuccess, setWasFirstTrySuccess] = useState(true);
  const [feedback, setFeedback] = useState<{
    status: 'correct' | 'warning' | 'error';
    title: string;
    message: string;
  } | null>(null);

  const insertDiacritic = (char: string) => {
    if (exercise.type === 'cloze_input') {
      const next = [...clozeValues];
      next[activeBlankIndex] = (next[activeBlankIndex] ?? '') + char;
      setClozeValues(next);
    } else if (exercise.type === 'free_translation') {
      setFreeInput((prev) => prev + char);
    }
  };

  const handleCheckAnswer = async (e: React.FormEvent) => {
    e.preventDefault();

    let isCorrect = false;
    let isWarning = false;
    let feedbackTitle = '';
    let feedbackMessage = exercise.explanationRu;

    if (exercise.type === 'multiple_choice') {
      const chosen = exercise.options.find((o) => o.id === selectedOptionId);
      if (!chosen) return;
      isCorrect = chosen.isCorrect;
      feedbackTitle = isCorrect ? 'Правильно!' : 'Обратите внимание на ловушку';
      feedbackMessage = chosen.feedbackRu;
    } else if (exercise.type === 'cloze_input') {
      if (clozeValues.some((v) => !v.trim())) return;
      let allCorrect = true;
      let anyDiacriticWarning = false;
      let customErrorMsg = '';

      for (let i = 0; i < exercise.blanks.length; i++) {
        const blank = exercise.blanks[i];
        const val = clozeValues[i] ?? '';
        const res = validatePolishAnswer(
          val,
          blank.acceptedAnswers,
          exercise.interferenceChecks
        );

        if (!res.isCorrect) {
          allCorrect = false;
          if (res.interferenceTriggered) {
            customErrorMsg = res.interferenceTriggered.feedbackRu;
            await logInterferenceError(
              res.interferenceTriggered.tag,
              exercise.id,
              val
            );
          } else {
            customErrorMsg = `Ожидалось: «${blank.acceptedAnswers[0]}». ${exercise.explanationRu}`;
          }
          break;
        }
        if (res.isDiacriticWarning) {
          anyDiacriticWarning = true;
          feedbackMessage =
            res.diacriticFeedbackRu ?? exercise.explanationRu;
        }
      }

      isCorrect = allCorrect;
      isWarning = allCorrect && anyDiacriticWarning;
      feedbackTitle = isWarning
        ? 'Верно, но проверьте диакритику!'
        : isCorrect
        ? 'Безупречно!'
        : 'Ошибка в форме слова';
      if (!isCorrect && customErrorMsg) {
        feedbackMessage = customErrorMsg;
      }
    } else if (exercise.type === 'word_bank') {
      const assembled = selectedTokens.join(' ');
      if (!assembled.trim()) return;
      const res = validatePolishAnswer(
        assembled,
        exercise.targetSentences,
        exercise.interferenceChecks
      );
      isCorrect = res.isCorrect;
      feedbackTitle = isCorrect ? 'Фраза собрана верно!' : 'Неверный порядок или лишнее слово';
      if (!isCorrect) {
        feedbackMessage = `Правильный вариант: «${exercise.targetSentences[0]}». ${exercise.explanationRu}`;
      }
    } else if (exercise.type === 'free_translation') {
      if (!freeInput.trim()) return;
      const res = validatePolishAnswer(
        freeInput,
        exercise.acceptedAnswers,
        exercise.interferenceChecks
      );
      isCorrect = res.isCorrect;
      isWarning = res.isCorrect && res.isDiacriticWarning;
      feedbackTitle = isWarning
        ? 'Засчитано (с подсказкой по диакритике)'
        : isCorrect
        ? 'Отличный перевод!'
        : 'Есть ошибка в конструкции';

      if (!isCorrect) {
        if (res.interferenceTriggered) {
          feedbackMessage = res.interferenceTriggered.feedbackRu;
          await logInterferenceError(
            res.interferenceTriggered.tag,
            exercise.id,
            freeInput
          );
        } else {
          feedbackMessage = `Эталонный ответ: «${exercise.acceptedAnswers[0]}». ${exercise.explanationRu}`;
        }
      } else if (isWarning && res.diacriticFeedbackRu) {
        feedbackMessage = res.diacriticFeedbackRu;
      }
    }

    if (!hasAttemptedOnce) {
      setHasAttemptedOnce(true);
      setWasFirstTrySuccess(isCorrect);
      await recordAttempt(isCorrect);
    }

    setFeedback({
      status: isWarning ? 'warning' : isCorrect ? 'correct' : 'error',
      title: feedbackTitle,
      message: feedbackMessage,
    });
  };

  return (
    <form
      onSubmit={handleCheckAnswer}
      className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-xs space-y-5"
    >
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
        <span className="inline-flex items-center rounded-md bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700">
          {exercise.grammarTag}
        </span>
        <span className="text-xs font-medium text-slate-500">
          Сложность: {exercise.difficulty === 1 ? 'Узнавание' : exercise.difficulty === 2 ? 'Конструктор' : 'Свободный ввод'}
        </span>
      </div>

      <div className="space-y-3">
        <p className="text-base sm:text-lg font-semibold text-slate-900 leading-snug">
          {exercise.promptRu}
        </p>

        {(exercise.audioUrl || exercise.promptPl) && (
          <div className="flex flex-wrap items-center gap-2 rounded-xl bg-slate-50 p-3 border border-slate-200">
            <button
              type="button"
              onClick={() => playPolishAudio(exercise.audioUrl, exercise.promptPl, false)}
              className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-3.5 py-2 text-xs font-semibold text-white hover:bg-red-700 transition-colors"
            >
              <Volume2 className="h-4 w-4" aria-hidden="true" />
              Слушать (1.0x)
            </button>
            <button
              type="button"
              onClick={() => playPolishAudio(exercise.audioUrl, exercise.promptPl, true)}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100 transition-colors"
            >
              Медленно (0.78x)
            </button>
            {exercise.promptPl && (
              <span className="text-sm font-medium text-slate-700 ml-1">
                «{exercise.promptPl}»
              </span>
            )}
          </div>
        )}
      </div>

      {/* 1. Multiple Choice */}
      {exercise.type === 'multiple_choice' && (
        <div className="space-y-2.5" role="radiogroup" aria-label={exercise.promptRu}>
          {exercise.options.map((option) => {
            const isSelected = selectedOptionId === option.id;
            return (
              <label
                key={option.id}
                className={`flex items-center gap-3 rounded-xl border p-3.5 cursor-pointer transition-all ${
                  isSelected
                    ? 'border-red-600 bg-red-50/50 ring-2 ring-red-600/20'
                    : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <input
                  type="radio"
                  name={exercise.id}
                  value={option.id}
                  checked={isSelected}
                  onChange={() => {
                    setSelectedOptionId(option.id);
                    setFeedback(null);
                  }}
                  className="h-4 w-4 accent-red-600"
                />
                <span className="text-sm sm:text-base font-medium text-slate-900">
                  {option.text}
                </span>
              </label>
            );
          })}
        </div>
      )}

      {/* 2. Cloze Input */}
      {exercise.type === 'cloze_input' && (
        <div className="space-y-4">
          <div className="rounded-xl bg-slate-50 p-4 border border-slate-200 text-base sm:text-lg leading-loose text-slate-900">
            {exercise.sentenceTemplate.split(/(\{\{\d+\}\})/g).map((part, idx) => {
              const match = part.match(/^\{\{(\d+)\}\}$/);
              if (!match) return <span key={idx}>{part}</span>;
              const blankIdx = Number(match[1]);
              const blank = exercise.blanks[blankIdx];
              return (
                <span key={idx} className="inline-flex items-baseline mx-1">
                  <input
                    type="text"
                    value={clozeValues[blankIdx] ?? ''}
                    onFocus={() => setActiveBlankIndex(blankIdx)}
                    onChange={(e) => {
                      const next = [...clozeValues];
                      next[blankIdx] = e.target.value;
                      setClozeValues(next);
                      setFeedback(null);
                    }}
                    placeholder={blank?.baseWordHint}
                    aria-label={blank?.baseWordHint ?? `Пропуск ${blankIdx + 1}`}
                    className="w-40 sm:w-48 rounded-lg border-2 border-slate-300 bg-white px-2.5 py-1 text-base font-semibold text-red-700 placeholder:font-normal placeholder:text-xs placeholder:text-slate-400 focus:border-red-600 focus:outline-none"
                  />
                </span>
              );
            })}
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs text-slate-500 mr-1">Польские буквы:</span>
            {POLISH_DIACRITIC_KEYS.map((ch) => (
              <button
                key={ch}
                type="button"
                onClick={() => insertDiacritic(ch)}
                className="h-8 w-8 rounded-lg border border-slate-300 bg-slate-50 text-sm font-semibold text-slate-800 hover:bg-red-50 hover:border-red-400 active:scale-95"
              >
                {ch}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 3. Word Bank */}
      {exercise.type === 'word_bank' && (
        <div className="space-y-4">
          <div className="min-h-14 rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 p-3 flex flex-wrap items-center gap-2">
            {selectedTokens.length === 0 ? (
              <span className="text-xs text-slate-400">
                Нажимайте на слова ниже, чтобы собрать польскую фразу...
              </span>
            ) : (
              selectedTokens.map((tok, idx) => (
                <button
                  key={`${tok}-${idx}`}
                  type="button"
                  onClick={() => {
                    setSelectedTokens(selectedTokens.filter((_, i) => i !== idx));
                    setFeedback(null);
                  }}
                  className="rounded-lg bg-red-600 px-3 py-1.5 text-sm font-semibold text-white shadow-2xs hover:bg-red-700"
                >
                  {tok}
                </button>
              ))
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            {exercise.tokens.map((token, idx) => {
              const usedCount = selectedTokens.filter((t) => t === token).length;
              const availableCount = exercise.tokens.filter((t) => t === token).length;
              const isDisabled = usedCount >= availableCount;
              return (
                <button
                  key={`${token}-${idx}`}
                  type="button"
                  disabled={isDisabled}
                  onClick={() => {
                    setSelectedTokens([...selectedTokens, token]);
                    setFeedback(null);
                  }}
                  className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-800 hover:bg-slate-100 disabled:opacity-35 disabled:pointer-events-none"
                >
                  {token}
                </button>
              );
            })}
            {selectedTokens.length > 0 && (
              <button
                type="button"
                onClick={() => {
                  setSelectedTokens([]);
                  setFeedback(null);
                }}
                className="inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-medium text-slate-500 hover:text-slate-800"
              >
                <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
                Сбросить
              </button>
            )}
          </div>
        </div>
      )}

      {/* 4. Free Translation */}
      {exercise.type === 'free_translation' && (
        <div className="space-y-3">
          <textarea
            rows={2}
            value={freeInput}
            onChange={(e) => {
              setFreeInput(e.target.value);
              setFeedback(null);
            }}
            placeholder="Введите перевод по-польски..."
            aria-label="Перевод на польский язык"
            className="w-full rounded-xl border-2 border-slate-300 p-3 text-base font-medium text-slate-900 focus:border-red-600 focus:outline-none"
          />
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs text-slate-500 mr-1">Польские буквы:</span>
            {POLISH_DIACRITIC_KEYS.map((ch) => (
              <button
                key={ch}
                type="button"
                onClick={() => insertDiacritic(ch)}
                className="h-8 w-8 rounded-lg border border-slate-300 bg-slate-50 text-sm font-semibold text-slate-800 hover:bg-red-50 hover:border-red-400"
              >
                {ch}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Feedback Banner */}
      {feedback && (
        <div
          role="status"
          className={`rounded-xl border p-4 flex items-start gap-3 ${
            feedback.status === 'correct'
              ? 'border-emerald-300 bg-emerald-50 text-emerald-950'
              : feedback.status === 'warning'
              ? 'border-amber-300 bg-amber-50 text-amber-950'
              : 'border-red-300 bg-red-50 text-red-950'
          }`}
        >
          {feedback.status === 'correct' && (
            <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600 mt-0.5" aria-hidden="true" />
          )}
          {feedback.status === 'warning' && (
            <AlertTriangle className="h-5 w-5 shrink-0 text-amber-600 mt-0.5" aria-hidden="true" />
          )}
          {feedback.status === 'error' && (
            <XCircle className="h-5 w-5 shrink-0 text-red-600 mt-0.5" aria-hidden="true" />
          )}
          <div className="space-y-1 text-sm">
            <p className="font-bold">{feedback.title}</p>
            <p className="leading-relaxed">{feedback.message}</p>
          </div>
        </div>
      )}

      {/* Action Footer */}
      <div className="flex items-center justify-end gap-3 pt-2">
        {feedback && (feedback.status === 'correct' || feedback.status === 'warning') ? (
          <button
            type="button"
            onClick={() => onComplete(wasFirstTrySuccess)}
            className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-bold text-white shadow-xs hover:bg-emerald-700 transition-colors"
          >
            Далее
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>
        ) : (
          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-bold text-white shadow-xs hover:bg-slate-800 transition-colors"
          >
            Проверить ответ
          </button>
        )}
      </div>
    </form>
  );
}
