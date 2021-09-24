import React from 'react';
import ReactDOM from 'react-dom';
import 'regenerator-runtime/runtime';

import App from './App';
import AppProvider from './providers/AppProvider';
import './index.scss';

if (false && 'serviceWorker' in navigator) {
    window.addEventListener('load', async function () {
        navigator.serviceWorker.getRegistration().then(async function (registration) {
            if (registration) {
                registration.update();
            } else {
                await navigator.serviceWorker.register(
                    new URL(/* webpackChunkName: "service-worker"*/ './workers/service-worker.ts', import.meta.url),
                );
            }
        });
    });
}

ReactDOM.render(
    <AppProvider>
        <App />
    </AppProvider>,
    document.getElementById('root'),
);
