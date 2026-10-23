export type CEFRLevel = 'A0' | 'A1' | 'A2' | 'B1' | 'B2';

export type SkillType =
  | 'listening'
  | 'reading'
  | 'grammar'
  | 'writing'
  | 'speaking'
  | 'vocabulary';

export type InterferenceTag =
  | 'ERR_POLITE_PLURAL'      // "Czy wy możecie" вместо "Czy może Pan/Pani"
  | 'ERR_MISSING_COPULA_BYC' // Пропуск глагола być в настоящем времени ("Ja z Białorusi")
  | 'ERR_FALSE_FRIEND'       // Ложные друзья (sklep, jutro, dywan, zapomnieć, parter/piętro)
  | 'ERR_VERB_GOV'           // Неверное управление глагола (dziękuję dla ciebie, czekam ciebie)
  | 'ERR_GENITIVE_NEGATION'  // Biernik вместо Dopełniacz после отрицания
  | 'ERR_MESKOOSOBOWY'       // Ошибка в мужско-личном роде мн. ч.
  | 'ERR_PAN_INFLECTION';    // Смешение Pan / Pana / Panu

export interface VocabItem {
  id: string;
  pl: string;
  ru: string;
  pronunciationHint: string;
  audioUrl: string;
  partOfSpeech: 'noun' | 'verb' | 'adj' | 'adv' | 'phrase';
  gender?: 'm' | 'f' | 'n';
  governmentHint?: string;
  falseFriendWarning?: string;
  examples: Array<{
    pl: string;
    ru: string;
    audioUrl?: string;
  }>;
  srsPromptSentence: string; // Предложение с пропуском {{0}} для Ступени 2 SRS (Active Recall + Morphology)
  srsAcceptedAnswers: string[];
  srsBaseHint: string;
}

export interface InterferenceRule {
  patternRegex: string;
  tag: InterferenceTag;
  feedbackRu: string;
}

export interface ExerciseBase {
  id: string;
  skill: SkillType;
  difficulty: 1 | 2 | 3; // 1 = Recognition, 2 = Guided, 3 = Active Production
  promptRu: string;
  promptPl?: string;
  audioUrl?: string;
  audioTranscriptPl?: string;
  grammarTag: string;
  explanationRu: string;
  interferenceChecks?: InterferenceRule[];
}

export type MultipleChoiceExercise = ExerciseBase & {
  type: 'multiple_choice';
  options: Array<{
    id: string;
    text: string;
    isCorrect: boolean;
    feedbackRu: string;
  }>;
};

export type ClozeInputExercise = ExerciseBase & {
  type: 'cloze_input';
  sentenceTemplate: string; // напр. "Skąd Pani {{0}}? — Ja {{1}} z Białorusi."
  blanks: Array<{
    acceptedAnswers: string[];
    baseWordHint: string;
  }>;
};

export type WordBankExercise = ExerciseBase & {
  type: 'word_bank';
  targetSentences: string[];
  tokens: string[]; // Все доступные слова-плашки (включая дистракторы)
};

export type FreeTranslationExercise = ExerciseBase & {
  type: 'free_translation';
  acceptedAnswers: string[];
  hintTokens?: string[];
};

export type Exercise =
  | MultipleChoiceExercise
  | ClozeInputExercise
  | WordBankExercise
  | FreeTranslationExercise;

export interface DialogueLine {
  speaker: string;
  role: 'npc' | 'user';
  pl: string;
  ru: string;
  pronunciationHint?: string;
  audioUrl?: string;
  grammarNote?: string;
}

export interface TheoryBlock {
  title: string;
  summaryRu: string;
  keyRules: Array<{
    ruleTitle: string;
    explanationRu: string;
    wrongExample?: string;
    correctExample: string;
    translationRu: string;
  }>;
  table?: {
    headers: string[];
    rows: string[][];
  };
}

export interface Lesson {
  id: string;
  number: string;
  titlePl: string;
  titleRu: string;
  estimatedMinutes: number;
  objectivesRu: string[];
  theory: TheoryBlock;
  dialogue?: {
    title: string;
    contextRu: string;
    lines: DialogueLine[];
  };
  exercises: Exercise[];
}

export interface QuestStep {
  id: string;
  stepTitle: string;
  situationRu: string;
  npcLinePl?: string;
  npcAudioUrl?: string;
  exercise: Exercise;
}

export interface CourseModule {
  id: string;
  releaseNumber: number;
  level: CEFRLevel;
  titlePl: string;
  titleRu: string;
  subtitleRu: string;
  estimatedHours: number;
  learningGoalsRu: string[];
  lessons: Lesson[];
  vocabulary: VocabItem[];
  quest: {
    id: string;
    title: string;
    descriptionRu: string;
    locationName: string;
    steps: QuestStep[];
  };
  finalTest: {
    id: string;
    passingScorePercent: number;
    exercises: Exercise[];
  };
  errorClinic: Array<{
    tag: InterferenceTag;
    title: string;
    wrongPl: string;
    correctPl: string;
    explanationRu: string;
  }>;
}
