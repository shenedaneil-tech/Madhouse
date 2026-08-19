const CACHE='madhouse-v5-hires-flush';
const ASSETS=['./','./index.html','./styles.css','./generated-art.css','./app.js','./manifest.webmanifest','./house-bg.svg','./kitchen-bg.svg','./assets/house-game.b64','./assets/kitchen-game.b64'];
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)));});
self.addEventListener('activate',e=>e.waitUntil(Promise.all([self.clients.claim(),caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k))))])));
self.addEventListener('fetch',e=>e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request))));