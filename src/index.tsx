import React from 'react';
import ReactDOM from 'react-dom';
import 'regenerator-runtime/runtime';
import { App } from 'app/App';
import { AppProvider } from 'app/model/AppProvider';

ReactDOM.render(
    <AppProvider>
        <App />
    </AppProvider>,
    document.getElementById('root'),
);
