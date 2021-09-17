import { createContext, useContext } from 'react';

/**
 * Dictionary of web application.
 * Instead of writing inline phrase of words,
 * use their respective code.
 */
export interface IDictionaryContextValue {
    /**
     * Set default language of dictionary
     */
    setLanguage: (language: string) => void;

    /**
     *  Get phrase or word by phrase code from selected dictionary.
     *  If code not presented in selected dictionary, when try to get word from default dictionary.
     *  If code not presented in default when return mock.
     */
    d: (code: string) => string;

    /**
     * Current language
     */
    lang: string;

    /**
     * Available languages
     */
    langs: string[];

    /**
     * Formate date to locale
     */
    formatDate: IDictionaryFormatDate;
}

// Контекст
export const dictionaryContext = createContext<IDictionaryContextValue>({
    setLanguage: async () => undefined,
    d: () => undefined,
    lang: 'en',
    langs: ['en'],
    formatDate: (date) => date.toString(),
});

// Hook, вызовом которого получаем контекст.
export const useDictionary = () => {
    return useContext<IDictionaryContextValue>(dictionaryContext);
};

export type IDictionaryFormatDate = (
    date: Date | string | number,
    format?: {
        type: 'time' | 'date' | 'all';
        /**
         * If advanced than use yestarday, ignore year for current year
         */
        advanced: boolean;
        /**
         * Referenced date
         */
        date?: Date | string | number;

        /**
         * Template
         */
        template?: string;
    },
) => string;
