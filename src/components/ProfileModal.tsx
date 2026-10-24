'use client';

import React, { useEffect, useRef, useState } from 'react';
import {
  Users,
  UserPlus,
  Check,
  Trash2,
  Flame,
  Award,
  X,
  Sparkles,
} from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import { DEFAULT_AVATARS, DEFAULT_COLORS, NewProfileInput } from '@/types/profile';
import { NewProfileInputSchema } from '@/lib/schema';

export function ProfileModal() {
  const {
    profiles,
    currentProfile,
    isProfileModalOpen,
    setProfileModalOpen,
    createProfile,
    switchProfile,
    deleteProfile,
  } = useAppStore();

  const [isCreating, setIsCreating] = useState(false);
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('🧑‍🎓');
  const [color, setColor] = useState('indigo');
  const [errorMsg, setErrorMsg] = useState('');
  const dialogRef = useRef<HTMLDialogElement>(null);

  // Синхронизируем нативный <dialog> с состоянием стора (showModal делает фон inert и ловит Esc/жест «назад»)
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (isProfileModalOpen && !dialog.open) dialog.showModal();
    if (!isProfileModalOpen && dialog.open) dialog.close();
  }, [isProfileModalOpen]);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    const parseResult = NewProfileInputSchema.safeParse({ name, avatar, color });
    if (!parseResult.success) {
      setErrorMsg(parseResult.error.errors[0]?.message || 'Проверьте введённые данные');
      return;
    }

    try {
      await createProfile({ name: name.trim(), avatar, color });
      setName('');
      setIsCreating(false);
    } catch {
      setErrorMsg('Не удалось сохранить профиль');
    }
  };

  const handleDelete = async (profileId: string, profileName: string) => {
    if (profiles.length <= 1) return;
    const confirmed = window.confirm(
      `Вы уверены, что хотите удалить профиль "${profileName}"? Весь прогресс и карточки повторения этого пользователя будут удалены.`
    );
    if (confirmed) {
      await deleteProfile(profileId);
    }
  };

  return (
    <dialog
      ref={dialogRef}
      onClose={() => setProfileModalOpen(false)}
      aria-labelledby="profile-modal-title"
      className="m-auto w-full max-w-lg bg-transparent p-4 backdrop:bg-slate-900/60 backdrop:backdrop-blur-sm"
    >
      <div className="bg-white rounded-3xl shadow-2xl w-full overflow-hidden border border-slate-100 flex flex-col max-h-[90vh]">
        {/* Шапка модального окна */}
        <div className="p-6 bg-gradient-to-r from-slate-900 to-indigo-950 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center backdrop-blur-md">
              <Users className="w-5 h-5 text-indigo-300" />
            </div>
            <div>
              <h2 id="profile-modal-title" className="text-xl font-bold">Профили обучения</h2>
              <p className="text-xs text-indigo-200">
                Занимайтесь всей семьёй или с друзьями с раздельным прогрессом
              </p>
            </div>
          </div>
          <button
            onClick={() => setProfileModalOpen(false)}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Закрыть"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Контент модального окна */}
        <div className="p-6 overflow-y-auto space-y-6">
          {!isCreating ? (
            <>
              {/* Список профилей */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  <span>Выберите активный профиль</span>
                  <span>{profiles.length} профиля(-ей)</span>
                </div>

                <div className="space-y-2">
                  {profiles.map((p) => {
                    const isActive = currentProfile?.id === p.id;
                    const colorScheme =
                      DEFAULT_COLORS.find((c) => c.id === p.color) ||
                      DEFAULT_COLORS[0];

                    return (
                      <div
                        key={p.id}
                        className={`group relative flex items-center justify-between p-4 rounded-2xl border-2 transition-all ${
                          isActive
                            ? 'border-indigo-600 bg-indigo-50/40 shadow-sm'
                            : 'border-slate-100 bg-white hover:border-slate-300 hover:bg-slate-50 cursor-pointer'
                        }`}
                        onClick={() => {
                          if (!isActive) switchProfile(p.id);
                        }}
                      >
                        <div className="flex items-center gap-3.5">
                          {/* Аватар */}
                          <div
                            className={`w-13 h-13 rounded-2xl flex items-center justify-center text-2xl shadow-inner ${colorScheme.bg} text-white`}
                          >
                            <span>{p.avatar}</span>
                          </div>

                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-slate-900 text-base">
                                {p.name}
                              </span>
                              {isActive && (
                                <span className="inline-flex items-center gap-1 text-[11px] font-semibold bg-indigo-600 text-white px-2 py-0.5 rounded-full">
                                  <Check className="w-3 h-3 stroke-[3]" />
                                  Активен
                                </span>
                              )}
                            </div>

                            {/* Статистика профиля */}
                            <div className="flex items-center gap-3 mt-1 text-xs text-slate-500">
                              <span className="inline-flex items-center gap-1">
                                <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                                {p.streakDays} дн. ударно
                              </span>
                              <span>•</span>
                              <span className="inline-flex items-center gap-1">
                                <Award className="w-3.5 h-3.5 text-indigo-500" />
                                {p.totalExercisesSolved} упр.
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Кнопка переключения / удаления */}
                        <div className="flex items-center gap-2">
                          {!isActive && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                switchProfile(p.id);
                              }}
                              className="text-xs font-semibold px-3 py-1.5 bg-slate-100 text-slate-700 hover:bg-indigo-600 hover:text-white rounded-xl transition-colors"
                            >
                              Выбрать
                            </button>
                          )}

                          {profiles.length > 1 && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDelete(p.id, p.name);
                              }}
                              className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors opacity-80 group-hover:opacity-100"
                              title="Удалить профиль"
                              aria-label="Удалить профиль"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Кнопка создания нового профиля */}
              <button
                onClick={() => {
                  setIsCreating(true);
                  setErrorMsg('');
                }}
                className="w-full py-3.5 px-4 rounded-2xl border-2 border-dashed border-indigo-200 hover:border-indigo-400 bg-indigo-50/30 hover:bg-indigo-50 text-indigo-700 font-semibold text-sm flex items-center justify-center gap-2 transition-all"
              >
                <UserPlus className="w-4 h-4" />
                <span>Добавить нового ученика</span>
              </button>
            </>
          ) : (
            /* Форма создания профиля */
            <form onSubmit={handleCreate} className="space-y-5">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <div className="flex items-center gap-2 font-bold text-slate-900">
                  <Sparkles className="w-4 h-4 text-indigo-600" />
                  <span>Новый профиль ученика</span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsCreating(false)}
                  className="text-xs font-medium text-slate-500 hover:text-slate-800"
                >
                  Отмена
                </button>
              </div>

              {errorMsg && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs">
                  {errorMsg}
                </div>
              )}

              {/* Имя */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Имя ученика
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Например: Мария, Паша, Денис..."
                  maxLength={30}
                  autoFocus
                  required
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm font-medium"
                />
              </div>

              {/* Выбор аватара */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Выберите аватар
                </label>
                <div className="grid grid-cols-5 gap-2">
                  {DEFAULT_AVATARS.map((emoji) => (
                    <button
                      key={emoji}
                      type="button"
                      onClick={() => setAvatar(emoji)}
                      className={`h-12 rounded-xl text-2xl flex items-center justify-center transition-all ${
                        avatar === emoji
                          ? 'bg-indigo-100 ring-2 ring-indigo-600 scale-105'
                          : 'bg-slate-50 hover:bg-slate-100'
                      }`}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>

              {/* Выбор цвета */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Цветовой акцент
                </label>
                <div className="grid grid-cols-6 gap-2">
                  {DEFAULT_COLORS.map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => setColor(c.id)}
                      className={`h-9 rounded-xl flex items-center justify-center transition-all ${c.bg} ${
                        color === c.id
                          ? 'ring-4 ring-offset-2 ring-indigo-500 scale-105'
                          : 'opacity-85 hover:opacity-100'
                      }`}
                      title={c.label}
                    >
                      {color === c.id && (
                        <Check className="w-4 h-4 text-white stroke-[3]" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Кнопки сохранения */}
              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsCreating(false)}
                  className="flex-1 py-2.5 px-4 rounded-xl border border-slate-200 text-slate-700 font-semibold text-sm hover:bg-slate-50 transition-colors"
                >
                  Назад
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm shadow-md shadow-indigo-200 transition-all"
                >
                  Сохранить и начать
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </dialog>
  );
}
