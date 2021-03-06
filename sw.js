const cachename = "game";
const name = "Browser";
const precache = [
  "/",
  "index.html",
  `Build/UnityLoader.js`,
  `Build/${name}.data.unityweb`,
  `Build/${name}.json`,
  `Build/${name}.wasm.code.unityweb`,
  `Build/${name}.wasm.framework.unityweb`,
  "TemplateData/favicon.ico",
  "TemplateData/fullscreen.png",
  "TemplateData/progressEmpty.Dark.png",
  "TemplateData/progressEmpty.Light.png",
  "./TemplateData/progressFull.Dark.png",
  "./TemplateData/progressFull.Light.png",
  "./TemplateData/progressLogo.Dark.png",
  "./TemplateData/progressLogo.Light.png",
  "./TemplateData/style.css",
  "./TemplateData/UnityProgress.js",
  "./TemplateData/webgl-logo.png",
];

self.addEventListener("install", (event) => {
  console.log("Service worker installing");
  event.waitUntil(
    caches.open(cachename).then((cache) => {
      return cache.addAll(precache);
    })
  );
});

self.addEventListener("activate", (event) => {
  console.log("Activating worker", event);
});

self.addEventListener("fetch", (event) => {
  console.log("Fetching for ", event.request.url);
  event.respondWith(
    caches.match(event.request).then((cacheResponse) => {
      if (cacheResponse) {
        return cacheResponse;
      }
      return fetch(event.request);
    })
  );
});
