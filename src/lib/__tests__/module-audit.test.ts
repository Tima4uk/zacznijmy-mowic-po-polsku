import fs from 'fs';
import path from 'path';
import { describe, it, expect } from 'vitest';
import { ALL_MODULES } from '@/content/modules';
import { CourseModuleSchema } from '@/lib/schema';
import {
  validatePolishAnswer,
  stripPolishDiacritics,
  normalizeText,
} from '@/lib/validator';
import { Exercise, SkillType } from '@/types/curriculum';

const PUBLIC_DIR = path.resolve(__dirname, '../../../public');

function getAllModuleExercises(mod: (typeof ALL_MODULES)[number]): Exercise[] {
  const lessonExercises = mod.lessons.flatMap((l) => l.exercises);
  const questExercises = mod.quest.steps.map((s) => s.exercise);
  const testExercises = mod.finalTest.exercises;
  return [...lessonExercises, ...questExercises, ...testExercises];
}

function getAllAudioUrls(mod: (typeof ALL_MODULES)[number]): string[] {
  const urls = new Set<string>();

  for (const voc of mod.vocabulary) {
    if (voc.audioUrl) urls.add(voc.audioUrl);
    for (const ex of voc.examples) {
      if (ex.audioUrl) urls.add(ex.audioUrl);
    }
  }

  for (const lesson of mod.lessons) {
    if (lesson.dialogue) {
      for (const line of lesson.dialogue.lines) {
        if (line.audioUrl) urls.add(line.audioUrl);
      }
    }
    for (const ex of lesson.exercises) {
      if (ex.audioUrl) urls.add(ex.audioUrl);
    }
  }

  for (const step of mod.quest.steps) {
    if (step.npcAudioUrl) urls.add(step.npcAudioUrl);
    if (step.exercise.audioUrl) urls.add(step.exercise.audioUrl);
  }

  for (const ex of mod.finalTest.exercises) {
    if (ex.audioUrl) urls.add(ex.audioUrl);
  }

  return Array.from(urls);
}

describe.each(ALL_MODULES)(
  'Полный скан и автотестирование модуля $id ($titlePl)',
  (mod) => {
    it('1. Проходит строгую валидацию Zod-схемы CourseModuleSchema', () => {
      const parsed = CourseModuleSchema.safeParse(mod);
      if (!parsed.success) {
        throw new Error(
          `Ошибки схемы в модуле ${mod.id}: ${JSON.stringify(parsed.error.format(), null, 2)}`
        );
      }
      expect(parsed.success).toBe(true);
    });

    it('2. Имеет уникальные ID для всех уроков, карточек SRS, шагов квеста и упражнений', () => {
      const seenIds = new Set<string>();
      const checkUnique = (id: string, context: string) => {
        expect(
          seenIds.has(id),
          `Дублирующийся ID "${id}" обнаружен в ${context}`
        ).toBe(false);
        seenIds.add(id);
      };

      checkUnique(mod.id, 'module.id');
      checkUnique(mod.quest.id, 'quest.id');
      checkUnique(mod.finalTest.id, 'finalTest.id');

      for (const lesson of mod.lessons) {
        checkUnique(lesson.id, `lesson ${lesson.number}`);
      }
      for (const voc of mod.vocabulary) {
        checkUnique(voc.id, `vocab ${voc.pl}`);
      }
      for (const step of mod.quest.steps) {
        checkUnique(step.id, `quest step ${step.stepTitle}`);
      }
      for (const ex of getAllModuleExercises(mod)) {
        checkUnique(ex.id, `exercise ${ex.id}`);
      }
    });

    it('3. Все ссылки на аудиофайлы существуют на диске в public/ и не пустые (> 1 КБ)', () => {
      const audioUrls = getAllAudioUrls(mod);
      expect(audioUrls.length).toBeGreaterThan(0);

      for (const url of audioUrls) {
        const relativePath = url.replace(/^\//, '');
        const fullPath = path.join(PUBLIC_DIR, relativePath);
        const exists = fs.existsSync(fullPath);
        expect(exists, `Отсутствует аудиофайл на диске: ${url} (${fullPath})`).toBe(
          true
        );
        const stats = fs.statSync(fullPath);
        expect(
          stats.size,
          `Аудиофайл повреждён или пуст (${stats.size} байт): ${url}`
        ).toBeGreaterThan(1000);
      }
    });

    it('4. Симуляция прохождения ВСЕХ упражнений модуля (100% решаемость и отсутствие багов в ответах)', () => {
      const allExercises = getAllModuleExercises(mod);

      for (const ex of allExercises) {
        if (ex.type === 'multiple_choice') {
          const correctOptions = ex.options.filter((o) => o.isCorrect);
          expect(
            correctOptions.length,
            `Упражнение ${ex.id} (multiple_choice) должно иметь ровно 1 правильный ответ, найдено: ${correctOptions.length}`
          ).toBe(1);

          const optionTexts = new Set(ex.options.map((o) => normalizeText(o.text)));
          expect(
            optionTexts.size,
            `В упражнении ${ex.id} есть дублирующиеся варианты ответа`
          ).toBe(ex.options.length);
        }

        if (ex.type === 'cloze_input') {
          const placeholders = ex.sentenceTemplate.match(/\{\{(\d+)\}\}/g) ?? [];
          expect(
            placeholders.length,
            `В упражнении ${ex.id} число маркеров {{n}} (${placeholders.length}) не совпадает с числом blanks (${ex.blanks.length})`
          ).toBe(ex.blanks.length);

          ex.blanks.forEach((blank, idx) => {
            expect(
              ex.sentenceTemplate.includes(`{{${idx}}}`),
              `В упражнении ${ex.id} отсутствует маркер {{${idx}}}`
            ).toBe(true);

            for (const accepted of blank.acceptedAnswers) {
              const res = validatePolishAnswer(
                accepted,
                blank.acceptedAnswers,
                ex.interferenceChecks
              );
              expect(
                res.isCorrect,
                `Эталонный ответ "${accepted}" в ${ex.id} (blank #${idx}) не проходит валидатор!`
              ).toBe(true);
              expect(
                res.isDiacriticWarning,
                `В эталонном ответе "${accepted}" в ${ex.id} пропущена польская диакритика!`
              ).toBe(false);
            }
          });
        }

        if (ex.type === 'word_bank') {
          // Проверяем, что главное целевое предложение можно на 100% собрать из массива tokens
          const primaryTarget = ex.targetSentences[0];
          const requiredWords = primaryTarget.trim().split(/\s+/);

          const availablePool = [...ex.tokens];
          for (const word of requiredWords) {
            const idxInPool = availablePool.indexOf(word);
            expect(
              idxInPool,
              `В упражнении ${ex.id} (word_bank) невозможно собрать фразу "${primaryTarget}": токен "${word}" отсутствует в массиве tokens (${JSON.stringify(ex.tokens)})`
            ).toBeGreaterThanOrEqual(0);
            availablePool.splice(idxInPool, 1);
          }

          // Проверяем, что есть хотя бы 1 слово-дистрактор
          expect(
            ex.tokens.length,
            `В упражнении ${ex.id} (word_bank) нет ни одного слова-дистрактора`
          ).toBeGreaterThan(requiredWords.length);

          // Проверяем валидацию собранного предложения
          const res = validatePolishAnswer(
            requiredWords.join(' '),
            ex.targetSentences,
            ex.interferenceChecks
          );
          expect(res.isCorrect).toBe(true);
        }

        if (ex.type === 'free_translation') {
          for (const ans of ex.acceptedAnswers) {
            const res = validatePolishAnswer(
              ans,
              ex.acceptedAnswers,
              ex.interferenceChecks
            );
            expect(
              res.isCorrect,
              `Эталонный перевод "${ans}" в ${ex.id} не проходит валидацию!`
            ).toBe(true);
            expect(res.isDiacriticWarning).toBe(false);

            // Если в эталоне есть польская диакритика, проверяем работу мягкого режима A0/A1 и строгого экзаменационного режима B1/B2
            const stripped = stripPolishDiacritics(ans);
            if (normalizeText(stripped) !== normalizeText(ans)) {
              const softRes = validatePolishAnswer(
                stripped,
                ex.acceptedAnswers,
                ex.interferenceChecks,
                false
              );
              expect(softRes.isCorrect).toBe(true);
              expect(softRes.isDiacriticWarning).toBe(true);

              const strictRes = validatePolishAnswer(
                stripped,
                ex.acceptedAnswers,
                ex.interferenceChecks,
                true
              );
              expect(strictRes.isCorrect).toBe(false);
              expect(strictRes.isDiacriticWarning).toBe(true);
            }
          }
        }

        // Проверяем корректность RegEx в interferenceChecks (отсутствие ложных срабатываний на правильных ответах)
        if (ex.interferenceChecks) {
          for (const rule of ex.interferenceChecks) {
            expect(() => new RegExp(rule.patternRegex, 'i')).not.toThrow();
          }
        }
      }
    });

    it('5. Проверяет все карточки SRS Ступени 2 (активный ввод морфологии в предложении)', () => {
      for (const voc of mod.vocabulary) {
        expect(voc.srsPromptSentence).toContain('{{0}}');
        for (const ans of voc.srsAcceptedAnswers) {
          const res = validatePolishAnswer(ans, voc.srsAcceptedAnswers);
          expect(
            res.isCorrect,
            `SRS-ответ "${ans}" в карточке ${voc.id} не проходит валидацию`
          ).toBe(true);
          expect(
            res.isDiacriticWarning,
            `В SRS-ответе "${ans}" карточки ${voc.id} пропущена диакритика`
          ).toBe(false);
        }
      }
    });

    it('6. Проверяет методический баланс: все 6 навыков и градация сложности 1 -> 2 -> 3', () => {
      const allExercises = getAllModuleExercises(mod);
      const skillsPresent = new Set<SkillType>(allExercises.map((e) => e.skill));
      const requiredSkills: SkillType[] = [
        'listening',
        'reading',
        'grammar',
        'writing',
        'speaking',
        'vocabulary',
      ];

      for (const skill of requiredSkills) {
        expect(
          skillsPresent.has(skill),
          `В модуле ${mod.id} отсутствуют упражнения на навык "${skill}"`
        ).toBe(true);
      }

      const difficultiesPresent = new Set(allExercises.map((e) => e.difficulty));
      expect(difficultiesPresent.has(1)).toBe(true);
      expect(difficultiesPresent.has(2)).toBe(true);
      expect(difficultiesPresent.has(3)).toBe(true);
    });
  }
);
