'use client';

let currentAudio: HTMLAudioElement | null = null;

/**
 * Воспроизводит предгенерированный MP3-файл польской озвучки (Azure/Edge Neural TTS),
 * а если файл недоступен или нужно озвучить произвольную фразу — использует браузерный Web Speech API (pl-PL).
 */
export function playPolishAudio(audioUrl?: string, fallbackTextPl?: string, slow = false): void {
  if (typeof window === 'undefined') return;

  if (currentAudio) {
    currentAudio.pause();
    currentAudio = null;
  }

  if (audioUrl) {
    const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
    const resolvedUrl =
      audioUrl.startsWith('/') && basePath ? `${basePath}${audioUrl}` : audioUrl;
    const audio = new Audio(resolvedUrl);
    audio.playbackRate = slow ? 0.78 : 1.0;
    currentAudio = audio;
    audio.play().catch(() => {
      if (fallbackTextPl) {
        speakWithWebSpeech(fallbackTextPl, slow);
      }
    });
    return;
  }

  if (fallbackTextPl) {
    speakWithWebSpeech(fallbackTextPl, slow);
  }
}

function speakWithWebSpeech(textPl: string, slow: boolean): void {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(textPl);
  utterance.lang = 'pl-PL';
  utterance.rate = slow ? 0.75 : 0.95;
  window.speechSynthesis.speak(utterance);
}
