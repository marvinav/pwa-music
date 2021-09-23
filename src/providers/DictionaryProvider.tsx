import React, { useState } from 'react';
import { dictionaryPath } from '../constants';

import { dictionaryContext, IDictionaryContextValue } from '../contexts/DictionaryContext';
import { cachedFetch } from '../utils/helpers';

export const DictionaryProvider: React.FC = (props) => {
    const dictionary = useDictionary();
    return <dictionaryContext.Provider value={dictionary}>{props.children}</dictionaryContext.Provider>;
};

const defaultLang = 'en_US';

// Реализация контекста словаря посредством загрузки json схем, которые хранятся в static
const useDictionary = (): IDictionaryContextValue => {
    const [language, setLanguage] = useState<string>(window.navigator.language.split('-')[0]);
    const [dictionary, setDictionary] = useState<{ [key: string]: string }>(null);

    React.useEffect(() => {
        setLanguage(language);
    }, [language]);

    React.useEffect(() => {
        if (!language || language === defaultLang) {
            setDictionary(null);
        } else {
            (async (language) => {
                try {
                    const response = await cachedFetch(dictionaryPath(language));
                    if (response.ok) {
                        setDictionary(await response.json());
                        return;
                    }
                } catch (err) {
                    console.error(err);
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
