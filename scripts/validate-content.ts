import fs from 'fs';
import path from 'path';
import { CourseModuleSchema, VocabItemSchema } from '../src/lib/schema';
import { ALL_MODULES } from '../src/content/modules';
import { THEMATIC_VOCAB_PACKS } from '../src/content/vocab-packs';
import { validatePolishAnswer, extractSpellingTargets } from '../src/lib/validator';

const PUBLIC_DIR = path.resolve(__dirname, '../public');

console.log('==========================================================');
console.log('🔍 ЗАПУСК ПОЛНОГО СКАНА И ТЕСТИРОВАНИЯ УЧЕБНЫХ МОДУЛЕЙ');
console.log('==========================================================\n');

let hasErrors = false;

for (const mod of ALL_MODULES) {
  console.log(`📦 Модуль [${mod.id}] (Релиз #${mod.releaseNumber}, Уровень ${mod.level}): "${mod.titlePl}"`);

  // 1. Схема Zod
  const schemaResult = CourseModuleSchema.safeParse(mod);
  if (!schemaResult.success) {
    console.error(`  ❌ Ошибка схемы Zod:`, schemaResult.error.format());
    hasErrors = true;
    continue;
  }
  console.log(`  ✅ Схема данных (Zod): валидна`);

  // 2. Подсчёт контента и навыков
  const lessonEx = mod.lessons.flatMap((l) => l.exercises);
  const questEx = mod.quest.steps.map((s) => s.exercise);
  const testEx = mod.finalTest.exercises;
  const allEx = [...lessonEx, ...questEx, ...testEx];

  const skillCounts: Record<string, number> = {};
  const diffCounts: Record<number, number> = { 1: 0, 2: 0, 3: 0 };

  for (const ex of allEx) {
    skillCounts[ex.skill] = (skillCounts[ex.skill] ?? 0) + 1;
    diffCounts[ex.difficulty] = (diffCounts[ex.difficulty] ?? 0) + 1;

    // Проверка сборки word_bank
    if (ex.type === 'word_bank') {
      const targetWords = ex.targetSentences[0].trim().split(/\s+/);
      const pool = [...ex.tokens];
      for (const w of targetWords) {
        const idx = pool.indexOf(w);
        if (idx === -1) {
          console.error(
            `  ❌ Упражнение ${ex.id} (word_bank): слово "${w}" из целевой фразы отсутствует в tokens!`
          );
          hasErrors = true;
        } else {
          pool.splice(idx, 1);
        }
      }
    }

    // Проверка эталонов cloze_input
    if (ex.type === 'cloze_input') {
      for (const b of ex.blanks) {
        const res = validatePolishAnswer(b.acceptedAnswers[0], b.acceptedAnswers, ex.interferenceChecks);
        if (!res.isCorrect) {
          console.error(`  ❌ Упражнение ${ex.id} (cloze_input): эталон "${b.acceptedAnswers[0]}" не проходит валидатор!`);
          hasErrors = true;
        }
      }
    }
  }

  console.log(
    `  ✅ Уроков: ${mod.lessons.length} | Карточек SRS: ${mod.vocabulary.length} | Шагов квеста: ${mod.quest.steps.length} | Заданий теста: ${testEx.length} (Всего упражнений: ${allEx.length})`
  );
  console.log(
    `  ✅ Баланс навыков: ${Object.entries(skillCounts)
      .map(([k, v]) => `${k}=${v}`)
      .join(', ')}`
  );
  console.log(
    `  ✅ Прогрессия сложности: Уровень 1 (Узнавание)=${diffCounts[1]}, Уровень 2 (Конструктор)=${diffCounts[2]}, Уровень 3 (Свободный ввод)=${diffCounts[3]}`
  );

  // 3. Проверка аудиофайлов на диске
  const audioUrls = new Set<string>();
  mod.vocabulary.forEach((v) => v.audioUrl && audioUrls.add(v.audioUrl));
  mod.lessons.forEach((l) => {
    l.dialogue?.lines.forEach((line) => line.audioUrl && audioUrls.add(line.audioUrl));
    l.exercises.forEach((e) => e.audioUrl && audioUrls.add(e.audioUrl));
  });
  mod.quest.steps.forEach((s) => {
    if (s.npcAudioUrl) audioUrls.add(s.npcAudioUrl);
    if (s.exercise.audioUrl) audioUrls.add(s.exercise.audioUrl);
  });
  mod.finalTest.exercises.forEach((e) => e.audioUrl && audioUrls.add(e.audioUrl));

  let missingAudio = 0;
  let totalAudioBytes = 0;
  for (const url of audioUrls) {
    const filePath = path.join(PUBLIC_DIR, url.replace(/^\//, ''));
    if (!fs.existsSync(filePath)) {
      console.error(`  ❌ Отсутствует аудиофайл: ${url}`);
      missingAudio++;
      hasErrors = true;
    } else {
      totalAudioBytes += fs.statSync(filePath).size;
    }
  }

  if (missingAudio === 0) {
    console.log(
      `  ✅ Аудиофайлы на диске: ${audioUrls.size}/${audioUrls.size} проверены (${Math.round(
        totalAudioBytes / 1024
      )} КБ)\n`
    );
  }
}

// 4. Проверка тематических пакетов расширения словарного запаса
console.log(`📚 Проверка тематических пакетов расширения словарного запаса (${THEMATIC_VOCAB_PACKS.length} пакета):`);
for (const pack of THEMATIC_VOCAB_PACKS) {
  let packAudioBytes = 0;
  for (const item of pack.words) {
    const parsed = VocabItemSchema.safeParse(item);
    if (!parsed.success) {
      console.error(`  ❌ Ошибка схемы VocabItem в пакете ${pack.id} (${item.id}):`, parsed.error.format());
      hasErrors = true;
    }
    const targets = extractSpellingTargets(item.pl);
    if (targets.length === 0) {
      console.error(`  ❌ Пустой эталон для диктанта/правописания в ${item.id}`);
      hasErrors = true;
    }
    if (item.audioUrl) {
      const filePath = path.join(PUBLIC_DIR, item.audioUrl.replace(/^\//, ''));
      if (!fs.existsSync(filePath)) {
        console.error(`  ❌ Отсутствует аудиофайл пакета слов: ${item.audioUrl}`);
        hasErrors = true;
      } else {
        packAudioBytes += fs.statSync(filePath).size;
      }
    }
  }
  console.log(
    `  ✅ Пакет [${pack.id}] "${pack.titleRu}": ${pack.words.length} слов, аудио проверено (${Math.round(
      packAudioBytes / 1024
    )} КБ)`
  );
}
console.log('');

if (hasErrors) {
  console.error('❌ Скан выявил ошибки! Исправьте их перед выпуском релиза.');
  process.exit(1);
} else {
  console.log('🎉 ВСЕ МОДУЛИ И СЛОВАРНЫЕ ПАКЕТЫ УСПЕШНО ПРОШЛИ СКАН И ПРОВЕРКУ КАЧЕСТВА!');
}
