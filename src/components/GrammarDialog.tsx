'use client';

import React, { useEffect, useId, useRef } from 'react';
import { X, ShieldAlert, CheckCircle2, Sparkles } from 'lucide-react';
import { getModuleById } from '@/content/modules';
import { useAppStore } from '@/store/useAppStore';

interface GrammarDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Модальное окно справочника грамматики и «Клиники типичных ошибок белоруса» (Error Clinic).
 * Использует нативный <dialog closedby="any"> с fallback-обработчиком клика по backdrop.
 */
export function GrammarDialog({ isOpen, onClose }: GrammarDialogProps) {
  const { selectedModuleId } = useAppStore();
  const activeModule = getModuleById(selectedModuleId);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen && !dialog.open) {
      dialog.showModal();
    } else if (!isOpen && dialog.open) {
      dialog.close();
    }
  }, [isOpen]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleClose = () => onClose();
    dialog.addEventListener('close', handleClose);

    // Fallback for browsers without native <dialog closedby="any"> support
    const handleBackdropClick = (event: MouseEvent) => {
      if ('closedBy' in HTMLDialogElement.prototype) return;
      if (event.target !== dialog) return;
      const rect = dialog.getBoundingClientRect();
      const isDialogContent =
        rect.top <= event.clientY &&
        event.clientY <= rect.top + rect.height &&
        rect.left <= event.clientX &&
        event.clientX <= rect.left + rect.width;
      if (!isDialogContent) {
        dialog.close();
      }
    };

    dialog.addEventListener('click', handleBackdropClick);
    return () => {
      dialog.removeEventListener('close', handleClose);
      dialog.removeEventListener('click', handleBackdropClick);
    };
  }, [onClose]);

  return (
    <dialog
      ref={dialogRef}
      {...({ closedby: 'any' } as React.DialogHTMLAttributes<HTMLDialogElement>)}
      aria-labelledby={titleId}
      className="m-auto w-full max-w-2xl rounded-2xl border border-slate-200 bg-white p-0 text-slate-900 shadow-2xl backdrop:bg-slate-950/60 backdrop:backdrop-blur-xs"
    >
      <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white px-6 py-4">
        <div className="flex items-center gap-2.5">
          <Sparkles className="h-5 w-5 text-red-600" aria-hidden="true" />
          <h2 id={titleId} className="text-lg font-bold text-slate-900">
            Шпаргалка Модуля {activeModule.releaseNumber} ({activeModule.level}) и Клиника ошибок
          </h2>
        </div>
        <form method="dialog">
          <button
            type="submit"
            aria-label="Закрыть справочник"
            className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 hover:text-slate-800"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </form>
      </div>

      <div className="max-h-[75vh] space-y-6 overflow-y-auto p-6">
        <section className="space-y-3">
          <h3 className="text-sm font-semibold tracking-wider text-slate-500 uppercase">
            Спряжение базовых глаголов (Czas teraźniejszy)
          </h3>
          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-xs font-semibold text-slate-600 uppercase">
                <tr>
                  <th className="px-3 py-2.5">Лицо</th>
                  <th className="px-3 py-2.5">BYĆ (быть)</th>
                  <th className="px-3 py-2.5">MIEĆ (иметь)</th>
                  <th className="px-3 py-2.5">MIESZKAĆ (жить)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr>
                  <td className="px-3 py-2 font-medium text-slate-700">1 л. (ja)</td>
                  <td className="px-3 py-2 font-semibold text-red-700">jestem</td>
                  <td className="px-3 py-2">mam</td>
                  <td className="px-3 py-2">mieszkam</td>
                </tr>
                <tr>
                  <td className="px-3 py-2 font-medium text-slate-700">2 л. (ty — другу)</td>
                  <td className="px-3 py-2 font-semibold text-red-700">jesteś</td>
                  <td className="px-3 py-2">masz</td>
                  <td className="px-3 py-2">mieszkasz</td>
                </tr>
                <tr className="bg-amber-50/60">
                  <td className="px-3 py-2 font-bold text-amber-900">
                    3 л. (on/ona / Pan/Pani)
                  </td>
                  <td className="px-3 py-2 font-bold text-red-700">jest</td>
                  <td className="px-3 py-2 font-bold text-slate-900">ma</td>
                  <td className="px-3 py-2 font-bold text-slate-900">mieszka</td>
                </tr>
                <tr>
                  <td className="px-3 py-2 font-medium text-slate-700">1 л. мн. (my)</td>
                  <td className="px-3 py-2 font-semibold text-red-700">jesteśmy</td>
                  <td className="px-3 py-2">mamy</td>
                  <td className="px-3 py-2">mieszkamy</td>
                </tr>
                <tr>
                  <td className="px-3 py-2 font-medium text-slate-700">2 л. мн. (wy — друзьям)</td>
                  <td className="px-3 py-2 font-semibold text-red-700">jesteście</td>
                  <td className="px-3 py-2">macie</td>
                  <td className="px-3 py-2">mieszkacie</td>
                </tr>
                <tr className="bg-amber-50/60">
                  <td className="px-3 py-2 font-bold text-amber-900">
                    3 л. мн. (oni/one / Państwo)
                  </td>
                  <td className="px-3 py-2 font-bold text-red-700">są</td>
                  <td className="px-3 py-2 font-bold text-slate-900">mają</td>
                  <td className="px-3 py-2 font-bold text-slate-900">mieszkają</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="space-y-3">
          <h3 className="text-sm font-semibold tracking-wider text-slate-500 uppercase">
            Клиника типичных ошибок (Pułapki Językowe)
          </h3>
          <div className="space-y-3">
            {activeModule.errorClinic.map((item, idx) => (
              <article
                key={`${item.tag}-${idx}`}
                className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-2"
              >
                <h4 className="font-semibold text-slate-900">{item.title}</h4>
                <div className="grid gap-2 sm:grid-cols-2 text-sm">
                  <div className="flex items-start gap-2 rounded-lg bg-red-50 p-2.5 text-red-900 border border-red-200">
                    <ShieldAlert className="h-4 w-4 shrink-0 text-red-600 mt-0.5" aria-hidden="true" />
                    <div>
                      <span className="text-xs font-bold uppercase block text-red-700">
                        Ошибка (Калька):
                      </span>
                      <span className="line-through">{item.wrongPl}</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 rounded-lg bg-emerald-50 p-2.5 text-emerald-950 border border-emerald-200">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600 mt-0.5" aria-hidden="true" />
                    <div>
                      <span className="text-xs font-bold uppercase block text-emerald-700">
                        По-польски правильно:
                      </span>
                      <span className="font-semibold">{item.correctPl}</span>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">{item.explanationRu}</p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </dialog>
  );
}
