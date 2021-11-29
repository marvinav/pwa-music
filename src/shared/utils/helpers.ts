export async function cachedFetch(request: RequestInfo, cacheName = 'cached-event'): Promise<Response> {
    try {
        if (!navigator.onLine) {
            throw new Error('Device is offline');
        }
        const response = await fetch(request);
        const responseClone = response.clone();
        caches.open(cacheName).then(function (cache) {
            console.log(`${(request as Request).url ?? request} added to cache`);
            cache.put(request, responseClone);
        });
        return response;
    } catch {
        return caches.match(request);
    }
}

export async function cachedFailbackToNetworkFetch(
    request: RequestInfo,
    cacheName = 'cached-event',
): Promise<Response> {
    const store = await caches.open(cacheName);
    const response = await store.match(request);
    if (response) {
        return response;
    }
    const networkResponse = await fetch(request);
    const responseClone = networkResponse.clone();
    store.put(request, responseClone);
    return networkResponse;
}
