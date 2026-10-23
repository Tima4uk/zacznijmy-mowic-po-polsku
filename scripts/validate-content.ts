import { CourseModuleSchema } from '../src/lib/schema';
import { MODULE_A0_01 } from '../src/content/modules/mod-a0-01';

const modules = [MODULE_A0_01];

for (const mod of modules) {
  const result = CourseModuleSchema.safeParse(mod);
  if (!result.success) {
    console.error(`❌ Ошибка валидации модуля ${mod.id}:`, result.error.format());
    process.exit(1);
  }
  console.log(
    `✅ Модуль ${mod.id} (${mod.titlePl}) успешно прошёл валидацию: ` +
      `${mod.lessons.length} уроков, ${mod.vocabulary.length} карточек SRS, ` +
      `${mod.quest.steps.length} шагов квеста, ${mod.finalTest.exercises.length} заданий теста.`
  );
}
