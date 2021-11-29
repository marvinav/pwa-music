export const startUp = (): void => {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', async function () {
            navigator.serviceWorker.getRegistration().then(async function (registration) {
                await (registration
                    ? registration.update()
                    : navigator.serviceWorker.register(
                          new URL(
                              /* webpackChunkName: "service-worker"*/ './workers/service-worker.ts',
                              import.meta.url,
                          ),
                      ));
            });
        });
    }
};
