/// <reference lib="WebWorker" />

self.addEventListener('fetch', (event: FetchEvent) => {
    event.respondWith(
        caches.match(event.request).then(function (response) {
            return response || fetch(event.request);
        }),
    );
});
