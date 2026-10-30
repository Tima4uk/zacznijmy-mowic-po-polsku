import { CourseModule } from '@/types/curriculum';
import { MODULE_A0_01 } from './mod-a0-01';
import { MODULE_A1_01 } from './mod-a1-01';
import { MODULE_A1_02 } from './mod-a1-02';
import { MODULE_A1_03 } from './mod-a1-03';

/**
 * Единый реестр всех разработанных учебных модулей.
 * Каждый новый модуль, добавленный сюда в очередном двухнедельном релизе,
 * автоматически проходит полный скан и автотестирование (структура, аудиофайлы,
 * решаемость всех упражнений, проверка токенов word_bank, отсутствие ложных срабатываний RegEx).
 */
export const ALL_MODULES: CourseModule[] = [
  MODULE_A0_01,
  MODULE_A1_01,
  MODULE_A1_02,
  MODULE_A1_03,
];

export function getModuleById(moduleId: string): CourseModule {
  return ALL_MODULES.find((m) => m.id === moduleId) ?? MODULE_A0_01;
}
