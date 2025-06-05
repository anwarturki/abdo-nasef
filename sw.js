const CACHE_NAME = 'abdo-nasef-v1';
const filesToCache = [
  './',
  './index.html',
  './css/style.css',
  './js/script.js',
  './images/*'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(filesToCache))
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request)
      .then((response) => response || fetch(e.request))
  );
});
