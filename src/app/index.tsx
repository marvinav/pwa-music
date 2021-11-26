import React from 'react';
import ReactDOM from 'react-dom';
import 'regenerator-runtime/runtime';
import { AppProvider } from 'features/providers';
import { App } from './App';

export const startApp = (): void => {
    ReactDOM.render(
        <AppProvider>
            <App />
        </AppProvider>,
        document.getElementById('root'),
    );
};
