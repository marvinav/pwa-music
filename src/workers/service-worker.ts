/// <reference lib="WebWorker" />
import 'regenerator-runtime/runtime';
import { cachedFetch } from './helpers';

self.addEventListener('fetch', (event: FetchEvent) => {
    console.log(event.request.url);
    event.respondWith(
        caches.match(event.request).then(function (response) {
            return response || fetch(event.request);
        }),
    );
});

self.addEventListener('install', async function (event: Event) {
    cachedFetch('asd');
    caches.open('main').then((cache) => {
        cache.addAll(['/']);
    });
});
