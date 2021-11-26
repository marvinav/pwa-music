import { createContext, useContext } from 'react';
import { View } from '../../shared/plugins/BasePlugin';
/**
 * Plugins of web application.
 */
export interface IPluginContextValue {
    getRoute: (pluginId: string, viewId: string) => View;
    getSettings: (author: string, pluginId: string) => View;
}

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
