import React from 'react';
import ReactDOM from 'react-dom';
import 'regenerator-runtime/runtime';
import { App } from './App';
import { AppProvider } from './model/AppProvider';

export const startApp = (): void => {
    ReactDOM.render(
        <AppProvider>
            <App />
        </AppProvider>,
        document.getElementById('root'),
    );
};
