const CACHE = 'k53-clear-v2';
const ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/src/engine/readiness.js',
  '/src/engine/mock.js',
  '/src/engine/scheduler.js',
  '/src/engine/coverage.js',
  '/src/storage/db.js',
  '/src/content/loader.js',
  '/data/families/signs-stop-vs-yield-001.json',
  '/data/families/signs-no-entry-001.json',
  '/data/families/rules-following-distance-001.json',
  '/data/families/rules-fourway-stop-001.json',
  '/data/families/controls-handbrake-001.json',
  '/data/logs/disagreement-v1.json'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request).then(res => {
      const copy = res.clone();
      caches.open(CACHE).then(c => c.put(e.request, copy));
      return res;
    }).catch(() => caches.match('/index.html')))
  );
});
