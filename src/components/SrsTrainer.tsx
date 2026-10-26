'use client';

import React, { useEffect, useMemo, useState } from 'react';
import {
  ArrowLeft,
  Volume2,
  Brain,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  Headphones,
  PenTool,
  Layers,
  Eye,
} from 'lucide-react';
import { ALL_MODULES, getModuleById } from '@/content/modules';
import { THEMATIC_VOCAB_PACKS } from '@/content/vocab-packs';
import { useAppStore, VocabDrillMode } from '@/store/useAppStore';
import { playPolishAudio } from '@/lib/audio';
import { validatePolishAnswer, extractSpellingTargets } from '@/lib/validator';
import { SrsRating } from '@/lib/srs';
import { VocabItem } from '@/types/curriculum';

const POLISH_KEYS = ['ą', 'ć', 'ę', 'ł', 'ń', 'ó', 'ś', 'ź', 'ż'];

export function SrsTrainer() {
  const {
    selectedModuleId,
    activeView,
    setView,
    srsCards,
    customWords,
    reviewSrsCard,
    recordAttempt,
  } = useAppStore();

  const activeModule = getModuleById(selectedModuleId);

  const initialDrillMode: VocabDrillMode =
    activeView.mode === 'srs_session' && activeView.drillMode
      ? activeView.drillMode
      : 'spelling';

  const initialSource =
    activeView.mode === 'srs_session' && activeView.packId
      ? activeView.packId
      : 'active_module';

  const [drillMode, setDrillMode] = useState<VocabDrillMode>(initialDrillMode);
  const [sourceDeck, setSourceDeck] = useState<string>(initialSource);

  // Формируем список карточек на основе выбранного источника
  const vocabList: VocabItem[] = useMemo(() => {
    if (sourceDeck === 'active_module') {
      return activeModule.vocabulary;
    }
    if (sourceDeck === 'all_modules') {
      return ALL_MODULES.flatMap((m) => m.vocabulary);
    }
    if (sourceDeck === 'custom_words') {
      return customWords.map((cw) => ({
        id: cw.id,
        pl: cw.pl,
        ru: cw.ru,
        pronunciationHint: cw.pronunciationHint || cw.pl,
        audioUrl: '',
        partOfSpeech: 'phrase',
        examples: [
          {
            pl: cw.examplePl || cw.pl,
            ru: cw.exampleRu || cw.ru,
          },
        ],
        srsPromptSentence: `Запишите по-польски: {{0}} (${cw.ru})`,
        srsAcceptedAnswers: extractSpellingTargets(cw.pl),
        srsBaseHint: cw.ru,
      }));
    }
    const foundPack = THEMATIC_VOCAB_PACKS.find((p) => p.id === sourceDeck);
    if (foundPack) {
      return foundPack.words;
    }
    return activeModule.vocabulary;
  }, [sourceDeck, activeModule, customWords]);

  const [cardIndex, setCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [checkResult, setCheckResult] = useState<{
    isCorrect: boolean;
    isWarning: boolean;
    message: string;
    canonicalPl: string;
  } | null>(null);
  const [sessionDone, setSessionDone] = useState(false);

  const currentVocab = vocabList[cardIndex];
  const cardState = currentVocab ? srsCards[currentVocab.id] : undefined;
  const stage = cardState?.stage ?? 'recognition';

  const spellingTargets = useMemo(
    () => (currentVocab ? extractSpellingTargets(currentVocab.pl) : []),
    [currentVocab]
  );

  // Автоматически воспроизводим аудио при открытии карточки в режиме «На слух (Диктант)»
  useEffect(() => {
    if (drillMode === 'dictation' && currentVocab && !sessionDone) {
      const primaryWord = extractSpellingTargets(currentVocab.pl)[0] || currentVocab.pl;
      playPolishAudio(currentVocab.audioUrl || undefined, primaryWord, false);
    }
  }, [drillMode, cardIndex, currentVocab, sessionDone]);

  const resetCardState = () => {
    setIsFlipped(false);
    setUserInput('');
    setShowHint(false);
    setCheckResult(null);
  };

  const handleSelectMode = (nextMode: VocabDrillMode) => {
    setDrillMode(nextMode);
    setCardIndex(0);
    setSessionDone(false);
    resetCardState();
  };

  const handleSelectDeck = (nextDeck: string) => {
    setSourceDeck(nextDeck);
    setCardIndex(0);
    setSessionDone(false);
    resetCardState();
  };

  const handleNextCard = async (rating: SrsRating) => {
    if (!currentVocab) return;
    await reviewSrsCard(currentVocab.id, rating);

    resetCardState();

    if (cardIndex + 1 < vocabList.length) {
      setCardIndex(cardIndex + 1);
    } else {
      setSessionDone(true);
    }
  };

  // Проверка письменного ввода для режимов «На слух (Диктант)», «Правописание (RU -> PL)» и «Контекст (SRS Ступень 2)»
  const handleWrittenCheck = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentVocab || !userInput.trim()) return;

    const accepted =
      drillMode === 'context' ? currentVocab.srsAcceptedAnswers : spellingTargets;
    const res = validatePolishAnswer(userInput, accepted);
    await recordAttempt(res.isCorrect);

    const canonical = accepted[0] ?? currentVocab.pl;
    setCheckResult({
      isCorrect: res.isCorrect,
      isWarning: res.isDiacriticWarning,
      canonicalPl: canonical,
      message: res.isCorrect
        ? res.diacriticFeedbackRu ?? `Отлично! Правильное написание: «${canonical}»`
        : `Обратите внимание на написание: «${canonical}» (${currentVocab.ru})`,
    });

    // Озвучиваем слово после проверки для закрепления связки «звук ↔ буквы»
    playPolishAudio(currentVocab.audioUrl || undefined, canonical, false);
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
          На главный экран
        </button>

        <span className="text-xs font-bold text-slate-500">
          Слово {Math.min(cardIndex + 1, Math.max(vocabList.length, 1))} из{' '}
          {vocabList.length}
        </span>
      </div>

      {/* Панель выбора режима и колоды слов */}
      <section className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-base sm:text-lg font-extrabold text-slate-900">
              Тренажёр словарного запаса: На слух и Прописывание
            </h1>
            <p className="text-xs text-slate-500">
              Переключайте режим, чтобы тренировать восприятие польских слов на слух, безошибочное письмо и падежные окончания.
            </p>
          </div>

          {/* Выбор колоды */}
          <div className="flex items-center gap-2">
            <Layers className="h-4 w-4 text-slate-400 shrink-0" aria-hidden="true" />
            <select
              value={sourceDeck}
              onChange={(e) => handleSelectDeck(e.target.value)}
              aria-label="Выбор набора слов"
              className="rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-xs font-bold text-slate-800 focus:border-red-600 focus:outline-none"
            >
              <option value="active_module">
                Текущий Модуль {activeModule.releaseNumber} ({activeModule.vocabulary.length} слов)
              </option>
              <option value="all_modules">
                Все открытые модули ({ALL_MODULES.flatMap((m) => m.vocabulary).length} слова)
              </option>
              {THEMATIC_VOCAB_PACKS.map((pack) => (
                <option key={pack.id} value={pack.id}>
                  {pack.iconEmoji} Пакет: {pack.titleRu} ({pack.words.length} слов)
                </option>
              ))}
              {customWords.length > 0 && (
                <option value="custom_words">
                  ⭐ Мои добавленные слова ({customWords.length})
                </option>
              )}
            </select>
          </div>
        </div>

        {/* 3 вкладки режимов тренировки */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
          <button
            type="button"
            onClick={() => handleSelectMode('dictation')}
            className={`flex items-center justify-center gap-2 rounded-xl border px-3.5 py-2.5 text-xs sm:text-sm font-bold transition-all ${
              drillMode === 'dictation'
                ? 'border-red-600 bg-red-600 text-white shadow-2xs'
                : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
            }`}
          >
            <Headphones className="h-4 w-4" aria-hidden="true" />
            <span>1. На слух (Аудиодиктант)</span>
          </button>

          <button
            type="button"
            onClick={() => handleSelectMode('spelling')}
            className={`flex items-center justify-center gap-2 rounded-xl border px-3.5 py-2.5 text-xs sm:text-sm font-bold transition-all ${
              drillMode === 'spelling'
                ? 'border-red-600 bg-red-600 text-white shadow-2xs'
                : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
            }`}
          >
            <PenTool className="h-4 w-4" aria-hidden="true" />
            <span>2. Прописать (RU → PL)</span>
          </button>

          <button
            type="button"
            onClick={() => handleSelectMode('context')}
            className={`flex items-center justify-center gap-2 rounded-xl border px-3.5 py-2.5 text-xs sm:text-sm font-bold transition-all ${
              drillMode === 'context'
                ? 'border-red-600 bg-red-600 text-white shadow-2xs'
                : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
            }`}
          >
            <Brain className="h-4 w-4" aria-hidden="true" />
            <span>3. В контексте (Морфология SRS)</span>
          </button>
        </div>
      </section>

      {!sessionDone && currentVocab && (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-7 shadow-xs space-y-6">
          {/* Режим 1: НА СЛУХ (АУДИОДИКТАНТ) */}
          {drillMode === 'dictation' && (
            <form onSubmit={handleWrittenCheck} className="space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <span className="inline-flex items-center gap-1.5 rounded-md bg-indigo-50 px-2.5 py-1 text-xs font-bold text-indigo-800 border border-indigo-200">
                  <Headphones className="h-3.5 w-3.5" aria-hidden="true" />
                  Режим «На слух»: прослушайте и пропишите по-польски
                </span>
                <button
                  type="button"
                  onClick={() => setShowHint((prev) => !prev)}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-slate-800"
                >
                  <Eye className="h-3.5 w-3.5" aria-hidden="true" />
                  {showHint ? 'Скрыть перевод' : 'Показать перевод-подсказку'}
                </button>
              </div>

              <div className="flex flex-col items-center justify-center rounded-2xl bg-slate-50 p-6 border border-slate-200 space-y-3 text-center">
                <div className="flex flex-wrap items-center justify-center gap-2.5">
                  <button
                    type="button"
                    onClick={() =>
                      playPolishAudio(
                        currentVocab.audioUrl || undefined,
                        spellingTargets[0] || currentVocab.pl,
                        false
                      )
                    }
                    className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-5 py-3 text-sm font-bold text-white shadow-xs hover:bg-red-700"
                  >
                    <Volume2 className="h-5 w-5" aria-hidden="true" />
                    Прослушать слово (1.0x)
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      playPolishAudio(
                        currentVocab.audioUrl || undefined,
                        spellingTargets[0] || currentVocab.pl,
                        true
                      )
                    }
                    className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-4 py-3 text-xs font-bold text-slate-700 hover:bg-slate-100"
                  >
                    Медленно (0.78x)
                  </button>
                </div>

                {showHint && (
                  <p className="text-sm font-semibold text-emerald-800 pt-1">
                    Перевод: «{currentVocab.ru}»
                  </p>
                )}
              </div>

              <div className="space-y-3">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">
                  Запишите услышанное слово или фразу по-польски:
                </label>
                <input
                  type="text"
                  value={userInput}
                  onChange={(e) => {
                    setUserInput(e.target.value);
                    setCheckResult(null);
                  }}
                  placeholder="Введите услышанное слово..."
                  autoFocus
                  className="w-full rounded-xl border-2 border-slate-300 bg-white px-4 py-3 text-base sm:text-lg font-bold text-slate-900 focus:border-red-600 focus:outline-none"
                />

                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-xs text-slate-500 mr-1">Польские буквы:</span>
                  {POLISH_KEYS.map((ch) => (
                    <button
                      key={ch}
                      type="button"
                      onClick={() => setUserInput((prev) => prev + ch)}
                      className="h-8 w-8 rounded-lg border border-slate-300 bg-slate-50 text-sm font-semibold text-slate-800 hover:bg-red-50"
                    >
                      {ch}
                    </button>
                  ))}
                </div>
              </div>

              {checkResult && (
                <div
                  className={`rounded-xl border p-4 space-y-2 text-sm ${
                    checkResult.isCorrect
                      ? 'border-emerald-300 bg-emerald-50 text-emerald-950'
                      : 'border-red-300 bg-red-50 text-red-950'
                  }`}
                >
                  <div className="flex items-center gap-2 font-bold">
                    {checkResult.isCorrect ? (
                      <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
                    ) : (
                      <AlertTriangle className="h-5 w-5 text-red-600 shrink-0" />
                    )}
                    <span>{checkResult.message}</span>
                  </div>
                  <p className="text-xs text-slate-700">
                    Транскрипция: <span className="font-mono">[{currentVocab.pronunciationHint}]</span> • Пример: «{currentVocab.examples[0]?.pl}» ({currentVocab.examples[0]?.ru})
                  </p>
                </div>
              )}

              <div className="flex justify-end gap-2.5">
                {!checkResult ? (
                  <button
                    type="submit"
                    className="rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-bold text-white hover:bg-slate-800"
                  >
                    Проверить диктант
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() =>
                      handleNextCard(checkResult.isCorrect ? 'good' : 'again')
                    }
                    className="rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-emerald-700"
                  >
                    Следующее слово →
                  </button>
                )}
              </div>
            </form>
          )}

          {/* Режим 2: ПРАВОПИСАНИЕ (RU -> PL) */}
          {drillMode === 'spelling' && (
            <form onSubmit={handleWrittenCheck} className="space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <span className="inline-flex items-center gap-1.5 rounded-md bg-amber-50 px-2.5 py-1 text-xs font-bold text-amber-900 border border-amber-200">
                  <PenTool className="h-3.5 w-3.5" aria-hidden="true" />
                  Режим «Правописание»: переведите и пропишите по-польски
                </span>
                <button
                  type="button"
                  onClick={() => setShowHint((prev) => !prev)}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-slate-800"
                >
                  <Eye className="h-3.5 w-3.5" aria-hidden="true" />
                  {showHint ? 'Скрыть первую букву' : 'Подсказать первую букву'}
                </button>
              </div>

              <div className="rounded-2xl bg-slate-50 p-5 border border-slate-200 space-y-2">
                <span className="text-xs font-bold uppercase text-slate-400 block">
                  По-русски:
                </span>
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                  {currentVocab.ru}
                </h2>
                {currentVocab.falseFriendWarning && (
                  <p className="text-xs font-medium text-amber-900 bg-amber-100/70 border border-amber-200 rounded-lg px-3 py-1.5 inline-block">
                    ⚠️ {currentVocab.falseFriendWarning}
                  </p>
                )}
                {showHint && (
                  <p className="text-xs font-mono font-bold text-red-700 pt-1">
                    Подсказка: начинается на «{(spellingTargets[0] || currentVocab.pl).slice(0, 2)}...» (произношение: [{currentVocab.pronunciationHint}])
                  </p>
                )}
              </div>

              <div className="space-y-3">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">
                  Напишите это слово по-польски:
                </label>
                <input
                  type="text"
                  value={userInput}
                  onChange={(e) => {
                    setUserInput(e.target.value);
                    setCheckResult(null);
                  }}
                  placeholder="Введите слово по-польски..."
                  autoFocus
                  className="w-full rounded-xl border-2 border-slate-300 bg-white px-4 py-3 text-base sm:text-lg font-bold text-slate-900 focus:border-red-600 focus:outline-none"
                />

                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-xs text-slate-500 mr-1">Польские буквы:</span>
                  {POLISH_KEYS.map((ch) => (
                    <button
                      key={ch}
                      type="button"
                      onClick={() => setUserInput((prev) => prev + ch)}
                      className="h-8 w-8 rounded-lg border border-slate-300 bg-slate-50 text-sm font-semibold text-slate-800 hover:bg-red-50"
                    >
                      {ch}
                    </button>
                  ))}
                </div>
              </div>

              {checkResult && (
                <div
                  className={`rounded-xl border p-4 space-y-2 text-sm ${
                    checkResult.isCorrect
                      ? 'border-emerald-300 bg-emerald-50 text-emerald-950'
                      : 'border-red-300 bg-red-50 text-red-950'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 font-bold">
                      {checkResult.isCorrect ? (
                        <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
                      ) : (
                        <AlertTriangle className="h-5 w-5 text-red-600 shrink-0" />
                      )}
                      <span>{checkResult.message}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        playPolishAudio(
                          currentVocab.audioUrl || undefined,
                          checkResult.canonicalPl,
                          false
                        )
                      }
                      className="inline-flex items-center gap-1 rounded-lg bg-white px-2.5 py-1 text-xs font-bold text-red-700 border border-slate-200"
                    >
                      <Volume2 className="h-3.5 w-3.5" />
                      Озвучить
                    </button>
                  </div>
                  <p className="text-xs text-slate-700">
                    Пример: «{currentVocab.examples[0]?.pl}» — {currentVocab.examples[0]?.ru}
                  </p>
                </div>
              )}

              <div className="flex justify-end gap-2.5">
                {!checkResult ? (
                  <button
                    type="submit"
                    className="rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-bold text-white hover:bg-slate-800"
                  >
                    Проверить правописание
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() =>
                      handleNextCard(checkResult.isCorrect ? 'good' : 'again')
                    }
                    className="rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-emerald-700"
                  >
                    Следующее слово →
                  </button>
                )}
              </div>
            </form>
          )}

          {/* Режим 3: В КОНТЕКСТЕ (ДВУХСТУПЕНЧАТЫЙ SRS) */}
          {drillMode === 'context' && (
            <>
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <span className="inline-flex items-center gap-1.5 rounded-md bg-red-50 px-2.5 py-1 text-xs font-bold text-red-700 border border-red-200">
                  <Brain className="h-3.5 w-3.5" aria-hidden="true" />
                  {stage === 'recognition'
                    ? 'Ступень 1: Пассивное узнавание'
                    : 'Ступень 2: Активная морфология в предложении'}
                </span>
                <span className="text-xs text-slate-500">
                  Интервал SRS: {cardState?.intervalDays ?? 0} дн.
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
                        playPolishAudio(
                          currentVocab.audioUrl || undefined,
                          currentVocab.pl,
                          false
                        )
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
                        <p className="text-lg font-bold text-emerald-800">
                          {currentVocab.ru}
                        </p>
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
                        <p className="text-xs text-slate-600">
                          {currentVocab.examples[0]?.ru}
                        </p>
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
                <form onSubmit={handleWrittenCheck} className="space-y-5">
                  <div className="space-y-1">
                    <span className="text-xs font-bold uppercase text-slate-500">
                      Значение: {currentVocab.ru}
                    </span>
                    <p className="text-base sm:text-lg font-semibold text-slate-900">
                      Вставьте слово в правильной грамматической форме (
                      {currentVocab.srsBaseHint}):
                    </p>
                  </div>

                  <div className="rounded-xl bg-slate-50 p-4 border border-slate-200 text-base sm:text-lg leading-loose text-slate-900">
                    {currentVocab.srsPromptSentence
                      .split('{{0}}')
                      .map((chunk, i, arr) => (
                        <React.Fragment key={i}>
                          <span>{chunk}</span>
                          {i < arr.length - 1 && (
                            <input
                              type="text"
                              value={userInput}
                              onChange={(e) => {
                                setUserInput(e.target.value);
                                setCheckResult(null);
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
                    <span className="text-xs text-slate-500 mr-1">
                      Польские буквы:
                    </span>
                    {POLISH_KEYS.map((ch) => (
                      <button
                        key={ch}
                        type="button"
                        onClick={() => setUserInput((prev) => prev + ch)}
                        className="h-8 w-8 rounded-lg border border-slate-300 bg-slate-50 text-sm font-semibold text-slate-800 hover:bg-red-50"
                      >
                        {ch}
                      </button>
                    ))}
                  </div>

                  {checkResult && (
                    <div
                      className={`rounded-xl border p-3.5 flex items-center gap-2.5 text-sm ${
                        checkResult.isCorrect
                          ? 'border-emerald-300 bg-emerald-50 text-emerald-950'
                          : 'border-red-300 bg-red-50 text-red-950'
                      }`}
                    >
                      {checkResult.isCorrect ? (
                        <CheckCircle2
                          className="h-5 w-5 text-emerald-600 shrink-0"
                          aria-hidden="true"
                        />
                      ) : (
                        <AlertTriangle
                          className="h-5 w-5 text-red-600 shrink-0"
                          aria-hidden="true"
                        />
                      )}
                      <span className="font-semibold">{checkResult.message}</span>
                    </div>
                  )}

                  {!checkResult ? (
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
                      <button
                        type="button"
                        onClick={() =>
                          handleNextCard(checkResult.isCorrect ? 'good' : 'again')
                        }
                        className="rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-emerald-700"
                      >
                        Далее →
                      </button>
                    </div>
                  )}
                </form>
              )}
            </>
          )}
        </div>
      )}

      {sessionDone && (
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 sm:p-8 text-center space-y-4">
          <Sparkles className="h-10 w-10 text-emerald-600 mx-auto" aria-hidden="true" />
          <h2 className="text-xl font-bold text-slate-900">
            Тренировка набора завершена!
          </h2>
          <p className="text-sm text-slate-700 max-w-md mx-auto">
            Вы проработали все {vocabList.length} слов выбранного набора. Можете сразу переключить режим (например, с «Правописания» на «Аудиодиктант») или выбрать другой тематический пакет выше.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={() => {
                setCardIndex(0);
                setSessionDone(false);
                resetCardState();
              }}
              className="rounded-xl bg-red-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-red-700"
            >
              Пройти этот набор ещё раз
            </button>
            <button
              type="button"
              onClick={() => setView({ mode: 'dashboard' })}
              className="rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-bold text-white hover:bg-slate-800"
            >
              Вернуться на главный экран
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
