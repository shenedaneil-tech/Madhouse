const CACHE='madhouse-v7-real-generated-art';
const ASSETS=['./','./index.html','./styles.css','./generated-art.css','./app.js','./manifest.webmanifest','./house-bg.svg','./kitchen-bg.svg','./assets/house-game.webp','./assets/kitchen-game.webp'];
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)));});
self.addEventListener('activate',e=>e.waitUntil(Promise.all([self.clients.claim(),caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k))))])));
self.addEventListener('fetch',e=>e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request))));