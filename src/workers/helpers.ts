export async function cachedFetch(request: RequestInfo) {
    const response = await caches.match(request);
    return response || fetch(request);
}
