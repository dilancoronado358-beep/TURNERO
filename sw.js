// ============================================================
//  Service Worker — Estrategia Network First con auto-update
//  Versión: v10 — Actualizar este número con cada deploy
// ============================================================
const CACHE_VERSION = 'turnero-cache-v10';
const urlsToCache = [
  './',
  './index.html',
  './style.css',
  './app.js'
];

// INSTALL: Precargar recursos en el nuevo caché
self.addEventListener('install', event => {
  // Activar inmediatamente sin esperar a que cierren las pestañas viejas
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_VERSION).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

// ACTIVATE: Eliminar cachés viejos de versiones anteriores
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames
          .filter(name => name !== CACHE_VERSION)
          .map(name => {
            console.log('[SW] Eliminando caché viejo:', name);
            return caches.delete(name);
          })
      );
    }).then(() => {
      // Tomar control de todas las pestañas/apps abiertas inmediatamente
      return self.clients.claim();
    })
  );
});

// FETCH: Network First — intenta la red, si falla usa caché
self.addEventListener('fetch', event => {
  // Solo manejar peticiones GET (ignorar POST, etc.)
  if (event.request.method !== 'GET') return;

  // Solo manejar recursos locales (no Supabase, Cloudinary, CDNs externos)
  const url = new URL(event.request.url);
  const isLocal = url.origin === self.location.origin;

  if (!isLocal) {
    // Recursos externos: siempre desde la red
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then(networkResponse => {
        // Respuesta de red exitosa: actualizar caché y devolver
        if (networkResponse && networkResponse.status === 200) {
          const responseClone = networkResponse.clone();
          caches.open(CACHE_VERSION).then(cache => {
            cache.put(event.request, responseClone);
          });
        }
        return networkResponse;
      })
      .catch(() => {
        // Sin red: usar caché como fallback
        return caches.match(event.request).then(cached => {
          if (cached) return cached;
          // Si no hay caché ni red, devolver página principal como fallback
          return caches.match('./index.html');
        });
      })
  );
});

// MENSAJE: Permite forzar actualización desde el cliente
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
