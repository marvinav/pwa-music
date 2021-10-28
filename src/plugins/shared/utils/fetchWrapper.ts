export type FetchEnum =
    | 'cache-first'
    | 'network-first'
    | 'cache-fallback'
    | 'network-fallback'
    | 'only-network'
    | 'only-cache';

/**
 * All static resources loaded as cache-fallback
 */
export const fetchWrapper = async (
    info: RequestInfo,
    init?: RequestInit,
    type: FetchEnum = 'cache-fallback',
): Promise<Response> => {
    if (type === 'only-network') {
        return fetch(info, init);
    }

    const isWorker = (self as unknown as ServiceWorkerGlobalScope).skipWaiting != null;

    // Send to worker if worker initialized
    if (!isWorker && window.navigator.serviceWorker && (await window.navigator.serviceWorker.getRegistration())) {
        const initMarked = init ?? {};
        initMarked.headers = { ...(initMarked.headers ?? {}), fetchType: type };
        return fetch(info, initMarked);
    }
    const request = new Request(info, init);

    if (type === 'only-cache') {
        return caches.match(request);
    }

    if (type === 'cache-fallback') {
        try {
            return await fetch(info, init);
        } catch {
            return caches.match(request);
        }
    }
    if (type === 'cache-first') {
        const response = await caches.match(request);
        if (response) {
            return response;
        }
        const networkResponse = await fetch(info, init);
        (await caches.open(type)).put(request, networkResponse.clone());
        return response;
    }
    if (type === 'network-fallback') {
        return (await caches.match(request)) ?? fetch(info, init);
    }
    if (type === 'network-first') {
        try {
            const response = fetch(info, init);
            (await caches.open(type)).put(request, (await response).clone());
            return response;
        } catch (err) {
            console.error(err);
            return caches.match(request);
        }
    }
};
