import { createContext, useContext } from 'react';
import { IPluginContextValue } from '../types';

// Контекст
export const PluginContext = createContext<IPluginContextValue>({
    getRoute: () => {
        throw new Error('Not implemented');
    },
    getSettings: () => {
        throw new Error('Not implemented');
    },
});

// Hook, вызовом которого получаем контекст.
export const usePlugin = (): IPluginContextValue => {
    return useContext<IPluginContextValue>(PluginContext);
};
