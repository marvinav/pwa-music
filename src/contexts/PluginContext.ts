import { createContext, useContext } from 'react';
import { View } from '../plugins/shared/BasePlugin';
/**
 * Plugins of web application.
 */
export interface IPluginContextValue {
    getRoute: (pluginId: string, viewId: string) => View;
}

// Контекст
export const PluginContext = createContext<IPluginContextValue>({
    getRoute: () => {
        throw new Error('Not implemented');
    },
});

// Hook, вызовом которого получаем контекст.
export const usePlugin = (): IPluginContextValue => {
    return useContext<IPluginContextValue>(PluginContext);
};
