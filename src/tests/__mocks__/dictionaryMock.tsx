import React, { useState } from 'react';

import { dictionaryContext, IDictionaryContextValue } from 'entities/contexts/DictionaryContext';

export const DictionaryProvider: React.FC = (props) => {
    const dictionary = useDictionary();
    return <dictionaryContext.Provider value={dictionary}>{props.children}</dictionaryContext.Provider>;
};

const defaultLang = 'en';

const ru = {
    home: 'Домой',
    about: 'Обо мне',
    blog: 'Блог',
};

// Реализация контекста словаря посредством загрузки json схем, которые хранятся в static
const useDictionary = (): IDictionaryContextValue => {
    const [language, setLanguage] = useState<string>(defaultLang);
    const [dictionary, setDictionary] = useState<{ [key: string]: string }>(null);

    React.useEffect(() => {
        setLanguage(language);
    }, [language]);

    React.useEffect(() => {
        if (!language || language === defaultLang) {
            setDictionary(null);
        } else if (language === 'ru') {
            setDictionary(ru);
        }
    }, [language]);

    const d = (code: string) => {
        return dictionary?.[code] ?? code;
    };

    return {
        d,
        setLanguage,
        lang: language,
        langs: [defaultLang, 'ru'],
    };
};
