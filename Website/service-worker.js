var CACHE_NAME = "static-cache";
var urlsToCache = [
  ".",
  "index.html"
];
self.addEventListener("install", function(event) {
    self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME)
    .then(function(cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

var blacklist = [
    "www.googletagmanager.com",
    "www.google-analytics.com"
]

var whitelistPath = [
    "/jquery.js",
    "/engine.js",
    "/index.js",
    "/offline.js",
    "/favicon/favicon-32x3",
    "https://www.davianeng.com/favicon/favicon-16x1",
    "/manifest.webmanifest",
    "/",
    "/Data/data.json",
    "/Data/flag.json",
    "/Data/names.json",
    "/sc_duty_list/",
    "/sc_duty_list/offline.js",
    "/sc_duty_list/engine.js",
    "/sc_duty_list/index.js",
    "/sc_duty_list/Data/data.json",
    "/favicon/favicon-32x32.png",
    "/sc_duty_list/Data/flag.json",
    "/sc_duty_list/Data/names.json",
    "/app.html",
    "/acknowledgment.html",
    "/app.js",
    "/walkthrough.html"
]

function blacklisted(event) {
    let domain = (new URL(event.request.url));
    if (blacklist.includes(domain.hostname)) {
        return false;
    } else if (domain.hostname === "127.0.0.1" || domain.hostname === "www.davianeng.com" || domain.hostname === "localhost") {
        if (whitelistPath.includes(domain.pathname)) {
            return true;
        } else {
            return false;
        }
    } else {
        return true;
    }
}

self.addEventListener("fetch", function (event) {
    
    event.respondWith(
      caches.open(CACHE_NAME).then(function (cache) {
        return cache.match(event.request).then(function (response) {
          var fetchPromise = fetch(event.request).then(function (networkResponse) {
            if (blacklisted(event)) {
            cache.put(event.request, networkResponse.clone());
            }
            return networkResponse;
          });
          return response || fetchPromise;
        });
      }),
    );
  });