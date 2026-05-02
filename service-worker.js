const CACHE_NAME = "wallpaper-cache-v1";
const ASSETS = [
  "/",
  "/index.html",
  "/manifest.json",
  "/service-worker.js",
  "/icon.png"
];

// 安装时缓存资源
self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

// 拦截请求，优先用缓存
self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((res) => res || fetch(e.request))
  );
});

// 激活时清理旧缓存
self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => key !== CACHE_NAME && caches.delete(key))
      )
    )
  );
});
