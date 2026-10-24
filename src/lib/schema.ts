import { z } from 'zod';

export const InterferenceTagSchema = z.enum([
  'ERR_POLITE_PLURAL',
  'ERR_MISSING_COPULA_BYC',
  'ERR_FALSE_FRIEND',
  'ERR_VERB_GOV',
  'ERR_GENITIVE_NEGATION',
  'ERR_MESKOOSOBOWY',
  'ERR_PAN_INFLECTION',
]);

export const VocabItemSchema = z.object({
  id: z.string().min(1),
  pl: z.string().min(1),
  ru: z.string().min(1),
  pronunciationHint: z.string().min(1),
  audioUrl: z.string().min(1),
  partOfSpeech: z.enum(['noun', 'verb', 'adj', 'adv', 'phrase']),
  gender: z.enum(['m', 'f', 'n']).optional(),
  governmentHint: z.string().optional(),
  falseFriendWarning: z.string().optional(),
  examples: z.array(
    z.object({
      pl: z.string().min(1),
      ru: z.string().min(1),
      audioUrl: z.string().optional(),
    })
  ).min(1),
  srsPromptSentence: z.string().includes('{{0}}'),
  srsAcceptedAnswers: z.array(z.string().min(1)).min(1),
  srsBaseHint: z.string().min(1),
});

const ExerciseBaseSchema = z.object({
  id: z.string().min(1),
  skill: z.enum(['listening', 'reading', 'grammar', 'writing', 'speaking', 'vocabulary']),
  difficulty: z.union([z.literal(1), z.literal(2), z.literal(3)]),
  promptRu: z.string().min(1),
  promptPl: z.string().optional(),
  audioUrl: z.string().optional(),
  audioTranscriptPl: z.string().optional(),
  grammarTag: z.string().min(1),
  explanationRu: z.string().min(1),
  interferenceChecks: z
    .array(
      z.object({
        patternRegex: z.string().min(1),
        tag: InterferenceTagSchema,
        feedbackRu: z.string().min(1),
      })
    )
    .optional(),
});

export const ExerciseSchema = z.discriminatedUnion('type', [
  ExerciseBaseSchema.extend({
    type: z.literal('multiple_choice'),
    options: z
      .array(
        z.object({
          id: z.string().min(1),
          text: z.string().min(1),
          isCorrect: z.boolean(),
          feedbackRu: z.string().min(1),
        })
      )
      .min(2),
  }),
  ExerciseBaseSchema.extend({
    type: z.literal('cloze_input'),
    sentenceTemplate: z.string().includes('{{0}}'),
    blanks: z
      .array(
        z.object({
          acceptedAnswers: z.array(z.string().min(1)).min(1),
          baseWordHint: z.string().min(1),
        })
      )
      .min(1),
  }),
  ExerciseBaseSchema.extend({
    type: z.literal('word_bank'),
    targetSentences: z.array(z.string().min(1)).min(1),
    tokens: z.array(z.string().min(1)).min(2),
  }),
  ExerciseBaseSchema.extend({
    type: z.literal('free_translation'),
    acceptedAnswers: z.array(z.string().min(1)).min(1),
    hintTokens: z.array(z.string()).optional(),
  }),
]);

export const CourseModuleSchema = z.object({
  id: z.string().min(1),
  releaseNumber: z.number().int().positive(),
  level: z.enum(['A0', 'A1', 'A2', 'B1', 'B2']),
  titlePl: z.string().min(1),
  titleRu: z.string().min(1),
  subtitleRu: z.string().min(1),
  estimatedHours: z.number().positive(),
  learningGoalsRu: z.array(z.string().min(1)).min(1),
  lessons: z.array(
    z.object({
      id: z.string().min(1),
      number: z.string().min(1),
      titlePl: z.string().min(1),
      titleRu: z.string().min(1),
      estimatedMinutes: z.number().positive(),
      objectivesRu: z.array(z.string().min(1)).min(1),
      theory: z.object({
        title: z.string().min(1),
        summaryRu: z.string().min(1),
        keyRules: z.array(
          z.object({
            ruleTitle: z.string().min(1),
            explanationRu: z.string().min(1),
            wrongExample: z.string().optional(),
            correctExample: z.string().min(1),
            translationRu: z.string().min(1),
          })
        ),
        table: z
          .object({
            headers: z.array(z.string()),
            rows: z.array(z.array(z.string())),
          })
          .optional(),
      }),
      dialogue: z
        .object({
          title: z.string().min(1),
          contextRu: z.string().min(1),
          lines: z.array(
            z.object({
              speaker: z.string().min(1),
              role: z.enum(['npc', 'user']),
              pl: z.string().min(1),
              ru: z.string().min(1),
              pronunciationHint: z.string().optional(),
              audioUrl: z.string().optional(),
              grammarNote: z.string().optional(),
            })
          ),
        })
        .optional(),
      exercises: z.array(ExerciseSchema).min(1),
    })
  ).min(1),
  vocabulary: z.array(VocabItemSchema).min(5),
  quest: z.object({
    id: z.string().min(1),
    title: z.string().min(1),
    descriptionRu: z.string().min(1),
    locationName: z.string().min(1),
    steps: z.array(
      z.object({
        id: z.string().min(1),
        stepTitle: z.string().min(1),
        situationRu: z.string().min(1),
        npcLinePl: z.string().optional(),
        npcAudioUrl: z.string().optional(),
        exercise: ExerciseSchema,
      })
    ).min(1),
  }),
  finalTest: z.object({
    id: z.string().min(1),
    passingScorePercent: z.number().min(50).max(100),
    exercises: z.array(ExerciseSchema).min(5),
  }),
  errorClinic: z.array(
    z.object({
      tag: InterferenceTagSchema,
      title: z.string().min(1),
      wrongPl: z.string().min(1),
      correctPl: z.string().min(1),
      explanationRu: z.string().min(1),
    })
  ),
});

export const UserProfileSchema = z.object({
  id: z.string().min(1),
  name: z.string().trim().min(1, 'Имя не должно быть пустым').max(30, 'Имя слишком длинное'),
  avatar: z.string().min(1),
  color: z.string().min(1),
  createdAt: z.number().int().positive(),
  streakDays: z.number().int().nonnegative(),
  lastActiveDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  totalExercisesSolved: z.number().int().nonnegative(),
  correctFirstTryCount: z.number().int().nonnegative(),
});

export const NewProfileInputSchema = z.object({
  name: z.string().trim().min(1, 'Введите имя профиля').max(30, 'Имя слишком длинное (до 30 символов)'),
  avatar: z.string().min(1),
  color: z.string().min(1),
});
