const CACHE='madhouse-v10-jpg-art';
const ASSETS=['./','./index.html','./styles.css?v=10','./generated-art.css?v=10','./app.js?v=10','./manifest.webmanifest?v=10','./assets/house-game.jpg','./assets/kitchen-game.jpg'];
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)));});
self.addEventListener('activate',e=>e.waitUntil(Promise.all([self.clients.claim(),caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k))))])));
self.addEventListener('fetch',e=>e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request))));