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
}
