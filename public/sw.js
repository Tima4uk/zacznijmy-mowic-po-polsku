// Service Worker for "Zaczynam mówić po polsku" PWA
const PAGES_CACHE = 'po-polsku-pages-v2';
const STATIC_CACHE = 'po-polsku-static-v2';
const AUDIO_CACHE = 'po-polsku-audio-v2';
const CURRENT_CACHES = [PAGES_CACHE, STATIC_CACHE, AUDIO_CACHE];

// Хешированные чанки /_next/static/ накапливаются с каждым деплоем — храним только последние N
const MAX_STATIC_ENTRIES = 150;

const PRECACHE_URLS = [
  './',
  'manifest.json',
  'icon-192.png',
  'icon-512.png',
  'icon-maskable-192.png',
  'icon-maskable-512.png',
  'apple-touch-icon.png',
  'favicon.ico'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(PAGES_CACHE).then((cache) => {
      return cache.addAll(PRECACHE_URLS).catch((err) => {
        console.warn('Pre-caching some assets failed:', err);
      });
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => !CURRENT_CACHES.includes(name))
          .map((name) => caches.delete(name))
      );
    }).then(() => self.clients.claim())
  );
});

async function trimCache(cacheName, maxEntries) {
  const cache = await caches.open(cacheName);
  const keys = await cache.keys(); // в порядке добавления — удаляем самые старые
  for (let i = 0; i < keys.length - maxEntries; i++) {
    await cache.delete(keys[i]);
  }
}

// Страницы: сеть, при успехе — обновляем кэш (чтобы офлайн была свежая HTML-оболочка)
async function networkFirstPage(request) {
  const cache = await caches.open(PAGES_CACHE);
  try {
    const response = await fetch(request);
    if (response.ok) {
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    return (
      (await cache.match(request)) ||
      (await cache.match('./')) ||
      Response.error()
    );
  }
}

// Аудио: <audio> запрашивает файл кусками (Range -> 206), такие ответы кэшировать нельзя.
// Поэтому кэшируем полный файл по URL и отдаём его целиком.
async function cacheFirstAudio(request) {
  const cache = await caches.open(AUDIO_CACHE);
  const cached = await cache.match(request.url);
  if (cached) return cached;

  const response = await fetch(request.url);
  if (response.ok) {
    cache.put(request.url, response.clone());
  }
  return response;
}

// Хешированные чанки Next.js неизменяемы: cache-first
async function cacheFirstStatic(request) {
  const cache = await caches.open(STATIC_CACHE);
  const cached = await cache.match(request);
  if (cached) return cached;

  const response = await fetch(request);
  if (response.ok) {
    await cache.put(request, response.clone());
    trimCache(STATIC_CACHE, MAX_STATIC_ENTRIES);
  }
  return response;
}

// Остальное (manifest, иконки): stale-while-revalidate
async function staleWhileRevalidate(request) {
  const cache = await caches.open(PAGES_CACHE);
  const cached = await cache.match(request);
  const network = fetch(request)
    .then((response) => {
      if (response.ok) {
        cache.put(request, response.clone());
      }
      return response;
    })
    .catch(() => cached || Response.error());
  return cached || network;
}

self.addEventListener('message', (event) => {
  // Чанки первого визита загружаются до того, как SW берёт страницу под контроль —
  // страница присылает их список, чтобы офлайн работал уже после первого посещения.
  if (event.data && event.data.type === 'CACHE_URLS' && Array.isArray(event.data.urls)) {
    event.waitUntil(
      caches.open(STATIC_CACHE)
        .then((cache) => cache.addAll(event.data.urls))
        .catch((err) => console.warn('Caching loaded assets failed:', err))
    );
  }
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  // Только свои ресурсы (не chrome-extension:, не сторонние домены)
  if (url.origin !== self.location.origin) return;

  if (request.mode === 'navigate') {
    event.respondWith(networkFirstPage(request));
  } else if (url.pathname.endsWith('.mp3')) {
    event.respondWith(cacheFirstAudio(request));
  } else if (url.pathname.includes('/_next/static/')) {
    event.respondWith(cacheFirstStatic(request));
  } else {
    event.respondWith(staleWhileRevalidate(request));
  }
});
