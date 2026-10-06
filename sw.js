// Kelenföld átszállás – service worker
// Az alkalmazás vázát tárolja, hogy gyenge térerőnél is betöltődjön.
// A FUTÁR API-t és a térképcsempéket SOHA nem cache-eli: azok mindig élőben jönnek.
const VERSION = '1.1.0';
const CACHE = 'kelenfold-' + VERSION;
const SHELL = ['./', './index.html', './manifest.webmanifest', './icons/icon-192.png', './icons/icon-512.png'];
const CDN = [
  'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css',
  'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js'
];

self.addEventListener('install', e => {
  e.waitUntil((async () => {
    const c = await caches.open(CACHE);
    await c.addAll(SHELL);
    for (const u of CDN) {
      try { const r = await fetch(u, {mode: 'cors'}); if (r.ok) await c.put(u, r); } catch (err) {}
    }
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', e => {
  e.waitUntil((async () => {
    for (const k of await caches.keys()) if (k !== CACHE) await caches.delete(k);
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  // élő adat: nem nyúlunk hozzá
  if (url.hostname === 'futar.bkk.hu' || url.hostname.endsWith('openstreetmap.org')) return;

  // saját fájlok: előbb hálózat (így a frissítés azonnal megjön), hiba esetén a tárolt példány
  if (url.origin === self.location.origin) {
    e.respondWith((async () => {
      try {
        const r = await fetch(req);
        if (r.ok) (await caches.open(CACHE)).put(req, r.clone());
        return r;
      } catch (err) {
        return (await caches.match(req)) || (await caches.match('./index.html'));
      }
    })());
    return;
  }

  // CDN és betűtípusok: tárolt példány azonnal, háttérben frissítés
  if (url.hostname === 'cdnjs.cloudflare.com' || url.hostname.startsWith('fonts.g')) {
    e.respondWith((async () => {
      const c = await caches.open(CACHE);
      const hit = await c.match(req);
      const net = fetch(req).then(r => { if (r.ok || r.type === 'opaque') c.put(req, r.clone()); return r; }).catch(() => null);
      return hit || (await net) || Response.error();
    })());
  }
});
