'use client';

import React, { useEffect, useState } from 'react';
import { Download, Smartphone, X, Check } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

export function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isStandalone, setIsStandalone] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [installedSuccessfully, setInstalledSuccessfully] = useState(false);

  useEffect(() => {
    // 1. Check if running in standalone mode (already installed)
    const checkStandalone = () => {
      const isWindowStandalone = window.matchMedia('(display-mode: standalone)').matches;
      const isNavigatorStandalone = (window.navigator as unknown as { standalone?: boolean }).standalone === true;
      return Boolean(isWindowStandalone || isNavigatorStandalone);
    };

    setIsStandalone(checkStandalone());

    // 2. Register Service Worker
    if ('serviceWorker' in navigator) {
      const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
      navigator.serviceWorker
        .register(`${basePath}/sw.js`, { scope: `${basePath}/` })
        .catch((err) => {
          console.warn('Service Worker registration skipped:', err);
        });
    }

    // 3. Listen to beforeinstallprompt
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    const handleAppInstalled = () => {
      setIsStandalone(true);
      setDeferredPrompt(null);
      setInstalledSuccessfully(true);
      setTimeout(() => setInstalledSuccessfully(false), 4000);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      try {
        await deferredPrompt.prompt();
        const choice = await deferredPrompt.userChoice;
        if (choice.outcome === 'accepted') {
          setIsStandalone(true);
        }
        setDeferredPrompt(null);
      } catch (err) {
        console.warn('Install prompt error:', err);
        setIsModalOpen(true);
      }
    } else {
      // If deferredPrompt is not yet available or on iOS/Firefox, show guide
      setIsModalOpen(true);
    }
  };

  // If already running as an installed standalone app, do not display button
  if (isStandalone) {
    return null;
  }

  return (
    <>
      <button
        type="button"
        onClick={handleInstallClick}
        className="inline-flex items-center gap-1.5 rounded-xl border border-red-200 bg-red-50 hover:bg-red-100 px-2.5 py-1.5 text-xs font-bold text-red-700 transition-colors shadow-2xs"
        title="Установить как приложение на телефон"
      >
        <Download className="h-4 w-4 text-red-600" aria-hidden="true" />
        <span className="hidden sm:inline">Установить</span>
        <span className="sm:hidden">Скачать</span>
      </button>

      {/* Instructions Modal if prompt is manual */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-xl border border-slate-200 space-y-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2.5">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-600 font-extrabold text-white">
                  <Smartphone className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    Установка на телефон
                  </h3>
                  <p className="text-xs text-slate-500">
                    Работает офлайн как обычное приложение
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-700">
              <div className="rounded-xl border border-slate-100 bg-slate-50 p-3.5 space-y-2">
                <p className="font-bold text-slate-900 flex items-center gap-1.5">
                  <span>🤖</span> Android (Chrome / Samsung Internet):
                </p>
                <ol className="list-decimal pl-4 space-y-1 text-slate-600">
                  <li>Нажмите на <strong>три точки (меню)</strong> в правом верхнем углу браузера.</li>
                  <li>Выберите <strong>«Установить приложение»</strong> (или «Добавить на главный экран»).</li>
                  <li>Иконка появится на рабочем столе как полноценное приложение.</li>
                </ol>
              </div>

              <div className="rounded-xl border border-slate-100 bg-slate-50 p-3.5 space-y-2">
                <p className="font-bold text-slate-900 flex items-center gap-1.5">
                  <span>🍎</span> iPhone / iPad (Safari):
                </p>
                <ol className="list-decimal pl-4 space-y-1 text-slate-600">
                  <li>Нажмите кнопку <strong>«Поделиться»</strong> (квадрат со стрелкой вверх внизу экрана).</li>
                  <li>Прокрутите вниз и выберите <strong>«На экран Домой»</strong>.</li>
                </ol>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="w-full rounded-xl bg-red-600 py-2.5 text-xs font-bold text-white hover:bg-red-700 transition-colors shadow-xs"
            >
              Понятно
            </button>
          </div>
        </div>
      )}

      {installedSuccessfully && (
        <div className="fixed bottom-4 right-4 z-50 flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-3 text-xs font-bold text-white shadow-lg animate-bounce">
          <Check className="h-4 w-4" />
          <span>Приложение успешно установлено!</span>
        </div>
      )}
    </>
  );
}
