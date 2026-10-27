'use client';

import React, { useEffect, useId, useRef, useState } from 'react';
import { X, ShieldAlert, CheckCircle2, Sparkles, HelpCircle, Hash, BookOpen } from 'lucide-react';
import { getModuleById } from '@/content/modules';
import { useAppStore } from '@/store/useAppStore';

interface GrammarDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Модальное окно справочника грамматики, падежей, вопросительных слов, числительных
 * и «Клиники типичных ошибок белоруса» (Error Clinic).
 * Использует нативный <dialog closedby="any"> с fallback-обработчиком клика по backdrop.
 */
export function GrammarDialog({ isOpen, onClose }: GrammarDialogProps) {
  const { selectedModuleId } = useAppStore();
  const activeModule = getModuleById(selectedModuleId);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const [cheatTab, setCheatTab] = useState<'verbs_clinic' | 'cases_questions' | 'numerals'>(
    'verbs_clinic'
  );

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
      className="m-auto w-full max-w-3xl rounded-2xl border border-slate-200 bg-white p-0 text-slate-900 shadow-2xl backdrop:bg-slate-950/60 backdrop:backdrop-blur-xs"
    >
      <div className="sticky top-0 z-10 border-b border-slate-200 bg-white px-6 pt-4 pb-3 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Sparkles className="h-5 w-5 text-red-600" aria-hidden="true" />
            <h2 id={titleId} className="text-base sm:text-lg font-bold text-slate-900">
              Интерактивная шпаргалка курса и Клиника ошибок
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

        <div className="flex flex-wrap gap-1.5">
          <button
            type="button"
            onClick={() => setCheatTab('verbs_clinic')}
            className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold transition-colors ${
              cheatTab === 'verbs_clinic'
                ? 'bg-red-600 text-white'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <BookOpen className="h-3.5 w-3.5" aria-hidden="true" />
            Глаголы и ловушки Модуля {activeModule.releaseNumber}
          </button>

          <button
            type="button"
            onClick={() => setCheatTab('cases_questions')}
            className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold transition-colors ${
              cheatTab === 'cases_questions'
                ? 'bg-red-600 text-white'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <HelpCircle className="h-3.5 w-3.5" aria-hidden="true" />
            7 падежей и Вопросительные слова
          </button>

          <button
            type="button"
            onClick={() => setCheatTab('numerals')}
            className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold transition-colors ${
              cheatTab === 'numerals'
                ? 'bg-red-600 text-white'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Hash className="h-3.5 w-3.5" aria-hidden="true" />
            Числительные (0 – 1 000 000, даты и цены)
          </button>
        </div>
      </div>

      <div className="max-h-[75vh] space-y-6 overflow-y-auto p-6">
        {/* ВКЛАДКА 1: ГЛАГОЛЫ И КЛИНИКА ОШИБОК */}
        {cheatTab === 'verbs_clinic' && (
          <>
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
                      <th className="px-3 py-2.5">MIESZKAĆ (-am)</th>
                      <th className="px-3 py-2.5">PRACOWAĆ (-uję)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    <tr>
                      <td className="px-3 py-2 font-medium text-slate-700">1 л. (ja)</td>
                      <td className="px-3 py-2 font-semibold text-red-700">jestem</td>
                      <td className="px-3 py-2">mam</td>
                      <td className="px-3 py-2">mieszkam</td>
                      <td className="px-3 py-2">pracuję</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2 font-medium text-slate-700">2 л. (ty — другу)</td>
                      <td className="px-3 py-2 font-semibold text-red-700">jesteś</td>
                      <td className="px-3 py-2">masz</td>
                      <td className="px-3 py-2">mieszkasz</td>
                      <td className="px-3 py-2">pracujesz</td>
                    </tr>
                    <tr className="bg-amber-50/60">
                      <td className="px-3 py-2 font-bold text-amber-900">
                        3 л. (on/ona / Pan/Pani)
                      </td>
                      <td className="px-3 py-2 font-bold text-red-700">jest</td>
                      <td className="px-3 py-2 font-bold text-slate-900">ma</td>
                      <td className="px-3 py-2 font-bold text-slate-900">mieszka</td>
                      <td className="px-3 py-2 font-bold text-slate-900">pracuje</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2 font-medium text-slate-700">1 л. мн. (my)</td>
                      <td className="px-3 py-2 font-semibold text-red-700">jesteśmy</td>
                      <td className="px-3 py-2">mamy</td>
                      <td className="px-3 py-2">mieszkamy</td>
                      <td className="px-3 py-2">pracujemy</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2 font-medium text-slate-700">2 л. мн. (wy — друзьям)</td>
                      <td className="px-3 py-2 font-semibold text-red-700">jesteście</td>
                      <td className="px-3 py-2">macie</td>
                      <td className="px-3 py-2">mieszkacie</td>
                      <td className="px-3 py-2">pracujecie</td>
                    </tr>
                    <tr className="bg-amber-50/60">
                      <td className="px-3 py-2 font-bold text-amber-900">
                        3 л. мн. (oni/one / Państwo)
                      </td>
                      <td className="px-3 py-2 font-bold text-red-700">są</td>
                      <td className="px-3 py-2 font-bold text-slate-900">mają</td>
                      <td className="px-3 py-2 font-bold text-slate-900">mieszkają</td>
                      <td className="px-3 py-2 font-bold text-slate-900">pracują</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section className="space-y-3">
              <h3 className="text-sm font-semibold tracking-wider text-slate-500 uppercase">
                Клиника типичных ошибок Модуля {activeModule.releaseNumber} (Pułapki Językowe)
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
          </>
        )}

        {/* ВКЛАДКА 2: 7 ПАДЕЖЕЙ И ВОПРОСИТЕЛЬНЫЕ СЛОВА */}
        {cheatTab === 'cases_questions' && (
          <>
            <section className="space-y-3">
              <h3 className="text-sm font-semibold tracking-wider text-slate-500 uppercase">
                7 падежей польского языка (Przypadki)
              </h3>
              <div className="overflow-x-auto rounded-xl border border-slate-200">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-slate-50 text-xs font-semibold text-slate-600 uppercase">
                    <tr>
                      <th className="px-3 py-2">Падеж по-русски</th>
                      <th className="px-3 py-2">По-польски</th>
                      <th className="px-3 py-2">Вопросы</th>
                      <th className="px-3 py-2">Когда используется</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    <tr>
                      <td className="px-3 py-2 font-medium">Именительный</td>
                      <td className="px-3 py-2 font-bold text-red-700">Mianownik</td>
                      <td className="px-3 py-2 font-semibold">Kto? Co?</td>
                      <td className="px-3 py-2 text-slate-600">Подлежащее, конструкция To jest...</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2 font-medium">Родительный</td>
                      <td className="px-3 py-2 font-bold text-red-700">Dopełniacz</td>
                      <td className="px-3 py-2 font-semibold">Kogo? Czego?</td>
                      <td className="px-3 py-2 text-slate-600">Отрицание (nie mam), 5+ złotych, szukać, do/z/od</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2 font-medium">Дательный</td>
                      <td className="px-3 py-2 font-bold text-red-700">Celownik</td>
                      <td className="px-3 py-2 font-semibold">Komu? Czemu?</td>
                      <td className="px-3 py-2 text-slate-600">Адресат (pomóc Panu/Pani, dziękuję)</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2 font-medium">Винительный</td>
                      <td className="px-3 py-2 font-bold text-red-700">Biernik</td>
                      <td className="px-3 py-2 font-semibold">Kogo? Co?</td>
                      <td className="px-3 py-2 text-slate-600">Прямое дополнение: mam, kupuję, poproszę kawę</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2 font-medium">Творительный</td>
                      <td className="px-3 py-2 font-bold text-red-700">Narzędnik</td>
                      <td className="px-3 py-2 font-semibold">Kim? Czym?</td>
                      <td className="px-3 py-2 text-slate-600">Профессия (jestem programistą), транспорт (jadę ósemką)</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2 font-medium">Предложный</td>
                      <td className="px-3 py-2 font-bold text-red-700">Miejscownik</td>
                      <td className="px-3 py-2 font-semibold">O kim? O czym? (Gdzie?)</td>
                      <td className="px-3 py-2 text-slate-600">Местонахождение: w Polsce, na drugim piętrze</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2 font-medium">Звательный</td>
                      <td className="px-3 py-2 font-bold text-red-700">Wołacz</td>
                      <td className="px-3 py-2 font-semibold">O! (обращение)</td>
                      <td className="px-3 py-2 text-slate-600">Вежливое обращение по имени: Panie Marku! Pani Anno!</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section className="space-y-3">
              <h3 className="text-sm font-semibold tracking-wider text-slate-500 uppercase">
                Вопросительные слова (Słowa pytające) и их ловушки
              </h3>
              <div className="overflow-x-auto rounded-xl border border-slate-200">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-slate-50 text-xs font-semibold text-slate-600 uppercase">
                    <tr>
                      <th className="px-3 py-2">Вопрос PL</th>
                      <th className="px-3 py-2">Перевод RU</th>
                      <th className="px-3 py-2">Пример и важное правило</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    <tr>
                      <td className="px-3 py-2 font-bold text-slate-900">Kiedy?</td>
                      <td className="px-3 py-2">Когда?</td>
                      <td className="px-3 py-2">Kiedy wracasz do domu?</td>
                    </tr>
                    <tr className="bg-amber-50/50">
                      <td className="px-3 py-2 font-bold text-red-700">Gdzie? / Dokąd? / Skąd? / Którędy?</td>
                      <td className="px-3 py-2">Где? / Куда? / Откуда? / Какой дорогой?</td>
                      <td className="px-3 py-2">
                        <strong>Gdzie</strong> mieszkasz? • <strong>Dokąd</strong> idziesz? •{' '}
                        <strong>Skąd</strong> wracasz? • <strong>Którędy</strong> iść na dworzec?
                      </td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2 font-bold text-slate-900">Ile? / Po ile?</td>
                      <td className="px-3 py-2">Сколько? / По сколько (почём)?</td>
                      <td className="px-3 py-2">
                        <strong>Ile</strong> kosztuje ten długopis? • <strong>Po ile</strong> są te jabłka?
                      </td>
                    </tr>
                    <tr className="bg-amber-50/50">
                      <td className="px-3 py-2 font-bold text-red-700">Dlaczego? (Czemu?) vs Po co?</td>
                      <td className="px-3 py-2">Почему? vs Зачем?</td>
                      <td className="px-3 py-2">
                        <strong>Dlaczego</strong> płaczesz? (причина) • <strong>Po co</strong> on idzie do lasu? (цель)
                      </td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2 font-bold text-slate-900">Czy?</td>
                      <td className="px-3 py-2">Частица «ли» (в начале вопроса!)</td>
                      <td className="px-3 py-2">
                        <strong>Czy</strong> to jest biblioteka? (Ставится строго в начале общего вопроса Да/Нет)
                      </td>
                    </tr>
                    <tr className="bg-amber-50/50">
                      <td className="px-3 py-2 font-bold text-red-700">Jaki (-a, -ie)? vs Który (-a, -e)?</td>
                      <td className="px-3 py-2">Какой (по качеству)? vs Который (по счёту / из списка)?</td>
                      <td className="px-3 py-2">
                        <strong>Jaka</strong> jest ta koszula? (качество) • <strong>Która</strong> jest godzina?{' '}
                        <strong>Który</strong> samochód jest lepszy?
                      </td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2 font-bold text-slate-900">Czyj (czyja, czyje)?</td>
                      <td className="px-3 py-2">Чей (чья, чьё)?</td>
                      <td className="px-3 py-2">Czyj dom stoi nad rzeką? Czyje dziecko siedzi na ławce?</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
          </>
        )}

        {/* ВКЛАДКА 3: ЧИСЛИТЕЛЬНЫЕ 0 – 1 000 000 */}
        {cheatTab === 'numerals' && (
          <>
            <section className="space-y-3">
              <div className="rounded-xl border border-amber-200 bg-amber-50 p-3.5 text-xs text-amber-950 space-y-1">
                <p className="font-bold">
                  📌 Три золотых правила польских числительных + исправление опечаток из распечаток:
                </p>
                <ul className="list-disc pl-4 space-y-1">
                  <li>
                    <strong>Цены и тысячи:</strong> 1 <em>złoty (tysiąc)</em> • 2, 3, 4 (22, 23, 24){' '}
                    <em>złote (tysiące)</em> • 5–20 (включая 12, 13, 14!) и десятки <em>złotych (tysięcy)</em>.
                  </li>
                  <li>
                    <strong>Двузначные порядковые (21–99):</strong> ОБА слова порядковые! 21-й ={' '}
                    <strong>dwudziesty pierwszy</strong> (а не «dwadzieścia pierwszy»).
                  </li>
                  <li>
                    <strong>Осторожно с опечатками в старых таблицах:</strong> 80 правильно пишется с буквой{' '}
                    <strong>i</strong> — <strong>osiemdziesiąt</strong> (не «osemdziesiąt»), а «трёхлетие» по-польски —{' '}
                    <strong>trzylecie</strong> (не «trzechlecie»).
                  </li>
                </ul>
              </div>

              <div className="overflow-x-auto rounded-xl border border-slate-200">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-slate-50 text-xs font-semibold text-slate-600 uppercase">
                    <tr>
                      <th className="px-3 py-2">#</th>
                      <th className="px-3 py-2">Количественное (Główne)</th>
                      <th className="px-3 py-2">Порядковое (Porządkowe)</th>
                      <th className="px-3 py-2">Существительное ж.р.</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    <tr>
                      <td className="px-3 py-1.5 font-bold">0</td>
                      <td className="px-3 py-1.5">zero</td>
                      <td className="px-3 py-1.5">zerowy (-a, -e)</td>
                      <td className="px-3 py-1.5 font-semibold text-indigo-800">zerówka (нулевой класс)</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-1.5 font-bold">1</td>
                      <td className="px-3 py-1.5">jeden (jedna, jedno)</td>
                      <td className="px-3 py-1.5">pierwszy (-a, -e)</td>
                      <td className="px-3 py-1.5 font-semibold text-indigo-800">jedynka</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-1.5 font-bold">2</td>
                      <td className="px-3 py-1.5">dwa (dwie)</td>
                      <td className="px-3 py-1.5">drugi (-a, -ie)</td>
                      <td className="px-3 py-1.5 font-semibold text-indigo-800">dwójka (we dwójkę)</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-1.5 font-bold">3</td>
                      <td className="px-3 py-1.5">trzy</td>
                      <td className="px-3 py-1.5">trzeci (-a, -e)</td>
                      <td className="px-3 py-1.5 font-semibold text-indigo-800">trójka</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-1.5 font-bold">4</td>
                      <td className="px-3 py-1.5">cztery</td>
                      <td className="px-3 py-1.5">czwarty (-a, -e)</td>
                      <td className="px-3 py-1.5 font-semibold text-indigo-800">czwórka</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-1.5 font-bold">5</td>
                      <td className="px-3 py-1.5">pięć</td>
                      <td className="px-3 py-1.5">piąty</td>
                      <td className="px-3 py-1.5 font-semibold text-indigo-800">piątka (w piątkę)</td>
                    </tr>
                    <tr className="bg-amber-50/40">
                      <td className="px-3 py-1.5 font-bold">6 / 7 / 8</td>
                      <td className="px-3 py-1.5">sześć / siedem / osiem</td>
                      <td className="px-3 py-1.5 font-bold text-red-700">szósty / siódmy / ósmy (через ó!)</td>
                      <td className="px-3 py-1.5 font-semibold text-indigo-800">szóstka / siódemka / ósemka</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-1.5 font-bold">9 / 10</td>
                      <td className="px-3 py-1.5">dziewięć / dziesięć</td>
                      <td className="px-3 py-1.5">dziewiąty / dziesiąty</td>
                      <td className="px-3 py-1.5">dziewiątka / dziesiątka</td>
                    </tr>
                    <tr className="bg-amber-50/40">
                      <td className="px-3 py-1.5 font-bold">11 / 12</td>
                      <td className="px-3 py-1.5">jedenaście / dwanaście</td>
                      <td className="px-3 py-1.5 font-bold text-red-700">jedenasty / dwunasty (a → u!)</td>
                      <td className="px-3 py-1.5">jedenastka / dwunastka</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-1.5 font-bold">15 / 19</td>
                      <td className="px-3 py-1.5">piętnaście / dziewiętnaście</td>
                      <td className="px-3 py-1.5">piętnasty / dziewiętnasty</td>
                      <td className="px-3 py-1.5">piętnastka / dziewiętnastka</td>
                    </tr>
                    <tr className="bg-amber-50/40">
                      <td className="px-3 py-1.5 font-bold">20 / 21</td>
                      <td className="px-3 py-1.5">dwadzieścia / dwadzieścia jeden</td>
                      <td className="px-3 py-1.5 font-bold text-red-700">dwudziesty / dwudziesty pierwszy</td>
                      <td className="px-3 py-1.5">dwudziestka</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-1.5 font-bold">30 / 40</td>
                      <td className="px-3 py-1.5">trzydzieści / czterdzieści</td>
                      <td className="px-3 py-1.5">trzydziesty / czterdziesty</td>
                      <td className="px-3 py-1.5">trzydziestka / czterdziestka</td>
                    </tr>
                    <tr className="bg-amber-50/40">
                      <td className="px-3 py-1.5 font-bold">50 / 80 / 90</td>
                      <td className="px-3 py-1.5 font-bold text-red-700">pięćdziesiąt / osiemdziesiąt / dziewięćdziesiąt</td>
                      <td className="px-3 py-1.5">pięćdziesiąty / osiemdziesiąty / dziewięćdziesiąty</td>
                      <td className="px-3 py-1.5">pięćdziesiątka / osiemdziesiątka</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-1.5 font-bold">100 / 200</td>
                      <td className="px-3 py-1.5">sto / dwieście</td>
                      <td className="px-3 py-1.5">setny / dwusetny</td>
                      <td className="px-3 py-1.5">setka</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-1.5 font-bold">300 / 400 / 500</td>
                      <td className="px-3 py-1.5">trzysta / czterysta / pięćset</td>
                      <td className="px-3 py-1.5">trzechsetny / czterechsetny / pięćsetny</td>
                      <td className="px-3 py-1.5">—</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-1.5 font-bold">1000 / 1 000 000</td>
                      <td className="px-3 py-1.5">tysiąc (2 tysiące, 5 tysięcy) / milion</td>
                      <td className="px-3 py-1.5">tysięczny / milionowy</td>
                      <td className="px-3 py-1.5">—</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
          </>
        )}
      </div>
    </dialog>
  );
}
