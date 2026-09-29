const CACHE_NAME = 'cyberpunk-pwa-v1';
// Файлы, которые мы хотим сохранить на телефоне
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon.svg'
];

// Установка Service Worker и кэширование файлов
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// Активация и удаление старого кэша, если он был
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
});

// Перехват запросов: сначала берем файлы из кэша (офлайн), если их нет — из интернета
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request);
    })
  );
});