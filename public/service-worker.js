const CACHE = 'jks-leads-v1.0.1';
const APP_SHELL = [
  '/',
  '/manifest.webmanifest',
  '/icons/JKS%20LEADS%20icon-192.jpg',
  '/icons/JKS%20LEADS%20icon-512.jpg',
  '/icons/JKS%20LEADS%20icon-maskable-512.jpg'
];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(APP_SHELL)));
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((key) => key !== CACHE).map((key) => caches.delete(key))))
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;
  event.respondWith(fetch(event.request).catch(() => caches.match(event.request).then((r) => r || caches.match('/'))));
});
