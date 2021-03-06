/// <reference lib="WebWorker" />

import 'regenerator-runtime/runtime';

import { Assets } from '@/entities/assets/Assets';
import { env } from '@/shared/env/env';
import { cachedFailbackToNetworkFetch, cachedFetch } from '@/shared/utils/helpers';

declare const self: ServiceWorkerGlobalScope;
console.log(`Service worker script of ${env.VERSION}v has been loaded`);
/**
 * Regex for url which related to application navigation
 */
const navRegex =
    /((?!\/assets\/|\/public\/|\/static\/|\/scripts\/).*)(^(?!.*\.js$|.*\.css$|.*\.html$|.*\.json$|.*\.webapp).*)/;

const assets = new Assets();

const install = async () => {
    console.time('Installation time');
    const cache = await caches.open('root');
    cache.add('/');
    const webpackAssets = await caches.open('webpack-assets');
    // Install assets for current webworker.
    console.log(await assets.getCoreAssetsUrls());
    await webpackAssets.addAll(await assets.getCoreAssetsUrls());
    console.timeEnd('Installation time');
    console.log('Service Worker Installed');
};

self.addEventListener('fetch', async (event) => {
    const requestUrl = new URL(event.request.url);
    const search = requestUrl.searchParams.get('fetch-type');
    if (search === 'networkCache') {
        event.respondWith(cachedFetch(event.request));
    } else if (search === 'cache-network') {
        console.log('failing back to network');
        event.respondWith(cachedFailbackToNetworkFetch(event.request));
    } else if (requestUrl.hostname === self.location.hostname) {
        event.respondWith(
            navRegex.test(requestUrl.pathname) ? caches.match('/') : cachedFailbackToNetworkFetch(event.request),
        );
    }
    return;
});

self.addEventListener('install', (_event) => {
    _event.waitUntil(install());
});

self.addEventListener('activate', async (_event) => {
    console.time('Activation time');
    // const cache = await caches.open('webpack-assets');
    // const cachedAssets = await cache.keys();
    // const coreUrls = await assets.getCoreAssetsUrls();
    // cachedAssets.forEach((cached) => {
    //     if (!coreUrls.find((a) => cached.url.endsWith(a))) {
    //         cache.delete(cached);
    //     }
    // });
    console.timeEnd('Activation time');
});
