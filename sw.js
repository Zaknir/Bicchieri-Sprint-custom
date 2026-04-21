const CACHE_NAME = 'bicchieri-sprint-v2.0'; // Incrementa questo numero (es. v2.1) ogni volta che modifichi CSS o JS
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './style.css',
  './script.js',
  './manifest.json',
  './icona-192.png'
];

// 1. Installazione: Scarica i file e forza l'attivazione immediata
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting(); 
});

// 2. Attivazione: Pulisce le vecchie cache e prende il controllo della pagina
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('Eliminazione vecchia cache:', cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// 3. Fetch: Serve i file dalla cache (Offline First) ma permette l'aggiornamento
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
