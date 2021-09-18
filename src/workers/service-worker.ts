/// <reference lib="WebWorker" />
import 'regenerator-runtime/runtime';
import { cachedFetch } from './helpers';
import { WebpackAsset } from '../types';

self.addEventListener('fetch', async (event: FetchEvent) => {
    event.respondWith(cachedFetch(event.request));
});

self.addEventListener('install', async function (event: Event) {
    console.log('Service Worker Installed');
    const assetsResponse = await cachedFetch(WebpackAsset);
    if (assetsResponse.ok) {
        const assets: AssertObject = await assetsResponse.json();
        const assetsUrls = assets && flatAsset(assets);
        console.log(assetsUrls);
        const webpackAssets = await caches.open('webpack-assets');
        await webpackAssets.addAll(assetsUrls);
    }
});

function flatAsset(assets: AssertObject) {
    const result = [];
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
