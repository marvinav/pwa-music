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
    } catch (err) {
        return caches.match(request);
    }
}
