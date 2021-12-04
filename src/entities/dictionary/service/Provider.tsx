import React, { useState } from 'react';

import { dictionaryContext } from '@/entities/dictionary';
import { cachedFetch } from '@/shared/utils/helpers';

import { IDictionaryContextValue } from '../types';

export const dictionaryPath = (lang: string): string => `public/dictionary/${lang}.json`;

export const DictionaryProvider: React.FC = (properties) => {
    const dictionary = useDictionary();
    return <dictionaryContext.Provider value={dictionary}>{properties.children}</dictionaryContext.Provider>;
};

const defaultLang = 'en_US';

// Реализация контекста словаря посредством загрузки json схем, которые хранятся в static
const useDictionary = (): IDictionaryContextValue => {
    const [language, setLanguage] = useState<string>(window.navigator.language.split('-')[0]);
    const [dictionary, setDictionary] = useState<{ [key: string]: string }>();

    React.useEffect(() => {
        setLanguage(language);
    }, [language]);

    React.useEffect(() => {
        if (!language || language === defaultLang) {
            // eslint-disable-next-line unicorn/no-useless-undefined
            setDictionary(undefined);
        } else {
            (async (language) => {
                try {
                    const response = await cachedFetch(dictionaryPath(language));
                    if (response.ok) {
                        setDictionary(await response.json());
                        return;
                    }
                } catch (error) {
                    console.error(error);
                }
            })(language);
        }
    }, [language]);

    const d = (code: string) => {
        return dictionary?.[code] ?? code;
    };

    return {
        d,
        setLanguage,
        lang: language,
        langs: [defaultLang, 'ru_RU', 'de'],
    };
};
