import React from 'react';
import ReactDOM from 'react-dom';
import 'regenerator-runtime/runtime';

import App from './App';
import AppProvider from './providers/AppProvider';
import { pluginManager } from './services/PluginManager';
import { env } from './utils/env';
if (env.SERVICE_WORKER && 'serviceWorker' in navigator) {
    window.addEventListener('load', async function () {
        navigator.serviceWorker.getRegistration().then(async function (registration) {
            if (registration) {
                const res = await fetch('/assets/manifest.webapp?fetch-type=networkCache');
                if (res.ok) {
                    const manifest = (await res.json()) as { version: typeof env.VERSION };
                    const newVersion = manifest.version.split('.');
                    const currentVersion = env.VERSION.split('.');
                    for (let i = 0; i < 3; i++) {
                        if (newVersion[i] !== currentVersion[i]) {
                            console.log('Service worker need to update');
                            await registration.update();
                            break;
                        }
                    }
                }
            } else {
                await navigator.serviceWorker.register(
                    new URL(/* webpackChunkName: "service-worker"*/ './workers/service-worker.ts', import.meta.url),
                );
            }
        });
    });
}

pluginManager.loadPlugins();

ReactDOM.render(
    <AppProvider>
        <App />
    </AppProvider>,
    document.getElementById('root'),
);
