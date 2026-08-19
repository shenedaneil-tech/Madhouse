const CACHE='madhouse-v9-generated-only';
const ASSETS=['./','./index.html','./styles.css?v=9','./generated-art.css?v=9','./app.js?v=9','./manifest.webmanifest?v=9','./assets/house-game.webp','./assets/kitchen-game.webp'];
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)));});
self.addEventListener('activate',e=>e.waitUntil(Promise.all([self.clients.claim(),caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k))))])));
self.addEventListener('fetch',e=>e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request))));