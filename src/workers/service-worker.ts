/// <reference lib="WebWorker" />

import 'regenerator-runtime/runtime';

import { Assets } from '../services/Assets';
import { cachedFailbackToNetworkFetch, cachedFetch } from '../utils/helpers';

declare const self: ServiceWorkerGlobalScope;

/**
 * Regex for url which related to application navigation
 */
const navRegex = /((?!\/assets\/|\/public\/|\/static\/|\/scripts\/).*)(^(?!.*\.js$|.*\.css$|.*\.html$).*)/;
const assets = new Assets();

self.addEventListener('fetch', async (event) => {
    const requestUrl = new URL(event.request.url);

    if (requestUrl.hostname === self.location.hostname) {
        event.respondWith(navRegex.test(requestUrl.pathname) ? caches.match('/') : cachedFetch(event.request));
    } else {
        const search = requestUrl.searchParams.get('my-space');
        if (!search) {
            event.respondWith(fetch(event.request));
        } else if (search === 'network-cache') {
            event.respondWith(cachedFetch(event.request));
        } else if (search === 'cache-network') {
            console.log('failing back to network');
            event.respondWith(cachedFailbackToNetworkFetch(event.request));
        }
    }
});

self.addEventListener('install', async (_ev) => {
    console.time('Installation time');
    (await caches.open('root')).add('/');
    const webpackAssets = await caches.open('webpack-assets');
    // Install assets for current webworker.
    await webpackAssets.addAll(await assets.getCoreAssetsUrls());
    console.timeEnd('Installation time');
    console.log('Service Worker Installed');
});

self.addEventListener('activate', async (_ev) => {
    console.time('Activation time');
    const cache = await caches.open('webpack-assets');
    const cachedAssets = await cache.keys();
    const coreUrls = await assets.getCoreAssetsUrls();
    cachedAssets.forEach((cached) => {
        if (!coreUrls.find((a) => cached.url.endsWith(a))) {
            cache.delete(cached);
        }
    });
    console.timeEnd('Activation time');
});
