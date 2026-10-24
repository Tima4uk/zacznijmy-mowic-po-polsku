export interface UserProfile {
  id: string;
  name: string;
  avatar: string; // Emoji e.g. '🦉', '🧑‍🎓', '👩‍💻', '🇵🇱', '🚀', '🦊'
  color: string;  // e.g. 'indigo', 'emerald', 'violet', 'amber', 'rose', 'sky'
  createdAt: number;
  streakDays: number;
  lastActiveDate: string; // YYYY-MM-DD
  totalExercisesSolved: number;
  correctFirstTryCount: number;
}

export type NewProfileInput = Pick<UserProfile, 'name' | 'avatar' | 'color'>;

export const DEFAULT_AVATARS = ['🦉', '🧑‍🎓', '👩‍💻', '🇵🇱', '🚀', '🦊', '🐱', '☕', '🎮', '🌟'] as const;

export const DEFAULT_COLORS = [
  { id: 'indigo', label: 'Индиго', bg: 'bg-indigo-600', ring: 'ring-indigo-500', badge: 'bg-indigo-50 text-indigo-700 border-indigo-200' },
  { id: 'emerald', label: 'Изумруд', bg: 'bg-emerald-600', ring: 'ring-emerald-500', badge: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  { id: 'violet', label: 'Фиолетовый', bg: 'bg-violet-600', ring: 'ring-violet-500', badge: 'bg-violet-50 text-violet-700 border-violet-200' },
  { id: 'amber', label: 'Янтарь', bg: 'bg-amber-600', ring: 'ring-amber-500', badge: 'bg-amber-50 text-amber-700 border-amber-200' },
  { id: 'rose', label: 'Розовый', bg: 'bg-rose-600', ring: 'ring-rose-500', badge: 'bg-rose-50 text-rose-700 border-rose-200' },
  { id: 'sky', label: 'Небесный', bg: 'bg-sky-600', ring: 'ring-sky-500', badge: 'bg-sky-50 text-sky-700 border-sky-200' },
] as const;
