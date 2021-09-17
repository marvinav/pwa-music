import dayjs from 'dayjs';
import Calendar from 'dayjs/plugin/calendar';
import React, { useCallback, useState } from 'react';
import 'dayjs/locale/ru.js';

import { dictionaryContext, IDictionaryContextValue, IDictionaryFormatDate } from '../contexts/DictionaryContext';

export default function DictionaryProvider(props: React.PropsWithChildren<unknown>) {
    const dictionary = useDictionary();
    return <dictionaryContext.Provider value={dictionary}>{props.children}</dictionaryContext.Provider>;
}

dayjs.extend(Calendar);
const defaultLang = 'en_US';
const langToTest = 'ru_RU';

const localeCalendar = (format: 'date' | string, local: 'ru_RU' | string) => {
    if (local === 'ru_RU') {
        switch (format) {
            case 'date':
            default:
                return {
                    sameDay: `[Сегодня]'`,
                    nextDay: `[Завтра]`,
                    nextWeek: `D MMM`,
                    lastDay: `[Вчера]`,
                    lastWeek: `dddd`,
                    sameMonth: `D MMM`,
                };
            case 'time':
                return {
                    sameDay: `HH:mm`,
                    nextDay: `[Завтра]`,
                    nextWeek: `D MMM`,
                    lastDay: `[Вчера]`,
                    lastWeek: `dddd`,
                    sameMonth: `D MMM`,
                };
        }
    }
    return {
        sameDay: `[Today at ]${format === 'date' ? ' HH:mm' : ''}`,
        nextDay: `[Tomorrow]${format === 'date' ? ' HH:mm' : ''}`,
        lastDay: `[Yesterday]${format === 'date' ? ' HH:mm' : ''}`,
        lastWeek: `dddd${format === 'date' ? ' HH:mm' : ''}`,
    };
};

const languageDictionary = {
    ru_RU: 'ru',
    en_US: 'en',
};
// Реализация контекста словаря посредством загрузки json схем, которые хранятся в static
const useDictionary = (): IDictionaryContextValue => {
    const [languages] = React.useState({
        ru_RU: require('../../static/dictionary/ru-RU.json'),
    });
    const [language, setLanguage] = useState<string>(langToTest ?? window.navigator.language);
    const [dictionary, setDictionary] = useState<{ [key: string]: string }>(null);
    React.useEffect(() => {
        try {
            const dayjsLocale = languageDictionary[language];
            if (dayjsLocale) {
                dayjs.locale(dayjsLocale);
            }
        } catch (ex) {
            console.warn(ex);
        }
        setLanguage(language);
    }, [language]);

    const formatDate: IDictionaryFormatDate = useCallback(
        (date, format) => {
            const parsedDate = dayjs(date);
            const calendar = localeCalendar(format.type, language);
            if (parsedDate.isSame(new Date(), 'year')) {
                (calendar as unknown as { sameElse: string }).sameElse = 'D MMMM';
            }
            if (format && format.advanced) {
                return parsedDate.calendar(format.date, calendar);
            } else if (format && format.template) {
                return parsedDate.format(format.template);
            }
            return parsedDate.toString();
        },
        [language],
    );

    React.useEffect(() => {
        if (language === defaultLang) {
            setDictionary(null);
        } else {
            fetch(languages[language]).then(x => {
                x.json().then(setDictionary);
            }).catch(err => {
                console.log(err)
            });
        }
    }, [language, languages]);

    const d = (code: string) => {
        return dictionary?.[code] ?? code;
    };

    return {
        d,
        setLanguage,
        lang: language,
        langs: [defaultLang, 'ru_RU', 'de'],
        formatDate,
    };
};
