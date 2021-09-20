/// <reference lib="WebWorker" />

import 'regenerator-runtime/runtime';
import { cachedFetch } from './helpers';
import { WebpackAsset } from '../types';

declare const self: ServiceWorkerGlobalScope;
declare const clients: Clients;

/**
 * Regex for url which related to application navigation
 */
const navRegex = /((?!\/assets\/|\/public\/|\/static\/|\/scripts\/).*)(^(?!.*\.js$|.*\.css$|.*\.html$).*)/;

self.addEventListener('fetch', async (event) => {
    const requestUrl = new URL(event.request.url);
    if (requestUrl.hostname === self.location.hostname && navRegex.test(requestUrl.pathname)) {
        console.log({ da: requestUrl.pathname });
        caches.match('/').then(console.log);
        event.respondWith(caches.match('/'));
    } else {
        event.respondWith(cachedFetch(event.request));
    }
});

self.addEventListener('install', async (ev) => {
    const assetsResponse = await cachedFetch(WebpackAsset);
    if (assetsResponse.ok) {
        const assets: AssertObject = await assetsResponse.json();
        const assetsUrls = new Set(assets && flatAsset(assets));
        const webpackAssets = await caches.open('webpack-assets');
        await webpackAssets.add('/');
        await webpackAssets.addAll([...assetsUrls].filter((x) => !x.startsWith('public/')));
    }
    console.log('Service Worker Installed');
});

function flatAsset(assets: AssertObject) {
    const result: string[] = [];
    for (const name of Object.getOwnPropertyNames(assets)) {
        const value = assets[name];
        if (typeof value === 'string') {
            result.push(value);
        } else if (value instanceof Array) {
            result.push(...value);
        } else {
            result.push(...flatAsset(value as AssertObject));
        }
    }
    return result;
}

interface AssertObject {
    [key: string]: string | AssertObject | Array<string>;
}
