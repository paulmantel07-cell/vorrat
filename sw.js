// Offline-Unterstützung: App-Dateien werden zwischengespeichert, damit "Mein Vorrat" auch ohne Netz startet.
// Nach einer Änderung an der App diese Nummer erhöhen, damit alle Geräte die neue Version laden.
const CACHE = "vorrat-v7";
const SHELL = ["./", "./index.html", "./config.js", "./manifest.webmanifest", "./icon-192.png", "./icon-512.png", "./apple-touch-icon.png"];
const CDN = ["www.gstatic.com", "cdn.jsdelivr.net", "fonts.googleapis.com", "fonts.gstatic.com"];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);

  // Eigene Dateien: erst Netz (immer aktuell), bei Offline aus dem Speicher.
  if (url.origin === self.location.origin) {
    // "no-cache": always ask GitHub whether the file changed (cheap 304 if not), so updates arrive at once.
    const fresh = req.mode === "navigate"
      ? fetch(req.url, { cache: "no-cache", credentials: "same-origin" })
      : fetch(req, { cache: "no-cache" });
    e.respondWith(
      fresh
        .then((res) => {
          if (res.ok) {
            const copy = res.clone();
            // store without "?v=…" so the cache does not grow with every start
            const key = req.mode === "navigate" || !url.search ? req : new Request(url.origin + url.pathname);
            caches.open(CACHE).then((c) => c.put(key, copy));
          }
          return res;
        })
        .catch(() => caches.match(req, { ignoreSearch: true }).then((r) => r || caches.match("./index.html")))
    );
    return;
  }

  // Bibliotheken und Schriften (feste Versionen): erst Speicher, sonst Netz.
  if (CDN.includes(url.hostname)) {
    e.respondWith(
      caches.match(req).then((hit) => hit || fetch(req).then((res) => {
        if (res.ok || res.type === "opaque") { const copy = res.clone(); caches.open(CACHE).then((c) => c.put(req, copy)); }
        return res;
      }))
    );
  }
  // Alles andere (Firebase-Datenbank, Open Food Facts) geht direkt ans Netz.
});
