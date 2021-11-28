import { createContext, useContext } from 'react';
import { IDictionaryContextValue } from '../types';

// Контекст
export const dictionaryContext = createContext<IDictionaryContextValue>({
    setLanguage: async () => undefined,
    d: () => undefined,
    lang: 'en',
    langs: ['en'],
});

// Hook, вызовом которого получаем контекст.
export const useDictionary = (): IDictionaryContextValue => {
    return useContext<IDictionaryContextValue>(dictionaryContext);
};
