const CACHE='madhouse-v11-direct-images';
const ASSETS=['./','./index.html','./styles.css?v=11','./generated-art.css?v=11','./app.js?v=11','./manifest.webmanifest?v=11','./assets/house-game.webp?v=11','./assets/kitchen-game.webp?v=11'];
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)));});
self.addEventListener('activate',e=>e.waitUntil(Promise.all([self.clients.claim(),caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k))))])));
self.addEventListener('fetch',e=>e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request))));