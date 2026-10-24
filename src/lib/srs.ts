export type SrsStage = 'recognition' | 'production';

export type SrsRating = 'again' | 'hard' | 'good' | 'easy';

export interface SrsCardState {
  profileId: string;
  vocabId: string;
  moduleId: string;
  stage: SrsStage;
  intervalDays: number;
  easeFactor: number;
  repetitions: number;
  dueTimestamp: number;
  lastReviewedAt?: number;
  lapses: number;
}

const DAY_MS = 24 * 60 * 60 * 1000;

export function createInitialSrsCard(
  vocabId: string,
  moduleId: string,
  profileId: string,
  now = Date.now()
): SrsCardState {
  return {
    profileId,
    vocabId,
    moduleId,
    stage: 'recognition', // Сначала Ступень 1: узнавание, затем Ступень 2: морфологический ввод в контексте
    intervalDays: 0,
    easeFactor: 2.5,
    repetitions: 0,
    dueTimestamp: now,
    lapses: 0,
  };
}

/**
 * Алгоритм интервального повторения с двухступенчатой прогрессией:
 * - На ступени 'recognition' после первого успешного ответа карточка переходит в 'production' (активный ввод в предложении).
 * - Слово считается вошедшим в Активный Словарь (Active Lexicon), когда stage === 'production' и intervalDays >= 14.
 */
export function scheduleNextReview(
  card: SrsCardState,
  rating: SrsRating,
  now = Date.now()
): SrsCardState {
  let { stage, intervalDays, easeFactor, repetitions, lapses } = card;

  if (rating === 'again') {
    repetitions = 0;
    intervalDays = 1;
    easeFactor = Math.max(1.3, easeFactor - 0.2);
    lapses += 1;
    return {
      ...card,
      stage,
      intervalDays,
      easeFactor,
      repetitions,
      lapses,
      lastReviewedAt: now,
      dueTimestamp: now + DAY_MS * 0.5, // повтор через 12 часов при ошибке
    };
  }

  // Если карточка была на этапе пассивного узнавания и отвечена верно — переводим на этап активной морфологии
  if (stage === 'recognition') {
    stage = 'production';
    repetitions = 1;
    intervalDays = rating === 'easy' ? 3 : 1;
    return {
      ...card,
      stage,
      intervalDays,
      easeFactor,
      repetitions,
      lastReviewedAt: now,
      dueTimestamp: now + intervalDays * DAY_MS,
    };
  }

  // Этап 'production' (Active Recall + Morphology)
  repetitions += 1;
  if (repetitions === 1) {
    intervalDays = 1;
  } else if (repetitions === 2) {
    intervalDays = 4;
  } else if (repetitions === 3) {
    intervalDays = 10;
  } else {
    const multiplier = rating === 'hard' ? 1.2 : rating === 'easy' ? easeFactor * 1.3 : easeFactor;
    intervalDays = Math.round(intervalDays * multiplier);
  }

  if (rating === 'hard') {
    easeFactor = Math.max(1.3, easeFactor - 0.15);
  } else if (rating === 'easy') {
    easeFactor = Math.min(3.0, easeFactor + 0.15);
  }

  return {
    ...card,
    stage,
    intervalDays,
    easeFactor,
    repetitions,
    lastReviewedAt: now,
    dueTimestamp: now + intervalDays * DAY_MS,
  };
}

export function isActiveLexiconMastered(card: SrsCardState): boolean {
  return card.stage === 'production' && card.intervalDays >= 14;
}
