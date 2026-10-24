import { describe, it, expect } from 'vitest';
import { UserProfileSchema, NewProfileInputSchema } from '../schema';
import { DEFAULT_AVATARS, DEFAULT_COLORS, UserProfile } from '@/types/profile';
import { createInitialSrsCard } from '../srs';

describe('UserProfile Model & Schema Validation', () => {
  const validProfile: UserProfile = {
    id: 'prof-test-1',
    name: 'Мария',
    avatar: '👩‍💻',
    color: 'emerald',
    createdAt: 1729700000000,
    streakDays: 3,
    lastActiveDate: '2026-10-24',
    totalExercisesSolved: 42,
    correctFirstTryCount: 38,
  };

  it('1. Валидный профиль проходит Zod-схему UserProfileSchema', () => {
    const result = UserProfileSchema.safeParse(validProfile);
    expect(result.success).toBe(true);
  });

  it('2. Отклоняет некорректные данные профиля', () => {
    // Пустое имя
    expect(UserProfileSchema.safeParse({ ...validProfile, name: '' }).success).toBe(false);
    expect(UserProfileSchema.safeParse({ ...validProfile, name: '   ' }).success).toBe(false);

    // Отрицательный стрик
    expect(UserProfileSchema.safeParse({ ...validProfile, streakDays: -1 }).success).toBe(false);

    // Некорректный формат даты
    expect(UserProfileSchema.safeParse({ ...validProfile, lastActiveDate: '24-10-2026' }).success).toBe(false);
  });

  it('3. Валидация входных данных при создании профиля (NewProfileInputSchema)', () => {
    const valid = NewProfileInputSchema.safeParse({
      name: 'Алексей',
      avatar: '🦉',
      color: 'indigo',
    });
    expect(valid.success).toBe(true);

    const emptyName = NewProfileInputSchema.safeParse({
      name: '  ',
      avatar: '🦉',
      color: 'indigo',
    });
    expect(emptyName.success).toBe(false);

    const tooLong = NewProfileInputSchema.safeParse({
      name: 'A'.repeat(35),
      avatar: '🦉',
      color: 'indigo',
    });
    expect(tooLong.success).toBe(false);
  });

  it('4. Набор аватаров и цветов по умолчанию не пуст и содержит ключевые опции', () => {
    expect(DEFAULT_AVATARS.length).toBeGreaterThanOrEqual(5);
    expect(DEFAULT_AVATARS).toContain('🦉');
    expect(DEFAULT_AVATARS).toContain('🇵🇱');

    expect(DEFAULT_COLORS.length).toBeGreaterThanOrEqual(4);
    const colorIds = DEFAULT_COLORS.map((c) => c.id);
    expect(colorIds).toContain('indigo');
    expect(colorIds).toContain('emerald');
  });

  it('5. Инициализация карточки SRS связывается с profileId', () => {
    const cardProfile1 = createInitialSrsCard('voc-01', 'mod-a0-01', 'profile-alex', 1000);
    expect(cardProfile1.profileId).toBe('profile-alex');
    expect(cardProfile1.stage).toBe('recognition');

    const cardProfile2 = createInitialSrsCard('voc-01', 'mod-a0-01', 'profile-maria', 1000);
    expect(cardProfile2.profileId).toBe('profile-maria');

    // Разные профили имеют изолированные сущности
    expect(cardProfile1.profileId).not.toBe(cardProfile2.profileId);
  });
});
