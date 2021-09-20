export async function cachedFetch(request: RequestInfo) {
    try {
        const response = await fetch(request);
        const responseClone = response.clone();
        caches.open('cached-event').then(function (cache) {
            console.log(`${(request as Request).url ?? request} added to cache`);
            cache.put(request, responseClone);
        });
        return response;
    } catch (err) {
        return caches.match(request);
    }
}
