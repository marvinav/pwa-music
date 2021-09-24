import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { DictionaryProvider } from './DictionaryProvider';

// В этом месте происходит объявление всех провайдеров
// Порядок вложенности в основном может быть хаотичным
// Но если провайдер A зависит от другого контекста B,
// то провайдер A тогда должен быть
// вложенным в провайдер В, реализующий этот контекст
const AppProvider: React.FC = (props) => {
    return (
        <BrowserRouter>
            <DictionaryProvider>{props.children}</DictionaryProvider>
        </BrowserRouter>
    );
};

export default AppProvider;
