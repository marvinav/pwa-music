import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { DictionaryProvider } from 'features/providers/DictionaryProvider';
import { PluginProvider } from 'features/plugins';

// В этом месте происходит объявление всех провайдеров
// Порядок вложенности в основном может быть хаотичным
// Но если провайдер A зависит от другого контекста B,
// то провайдер A тогда должен быть
// вложенным в провайдер В, реализующий этот контекст
export const AppProvider: React.FC = (props) => {
    return (
        <BrowserRouter basename="/">
            <PluginProvider>
                <DictionaryProvider>{props.children}</DictionaryProvider>
            </PluginProvider>
        </BrowserRouter>
    );
};
