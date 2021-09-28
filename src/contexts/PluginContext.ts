import React, { createContext, useContext } from 'react';

/**
 * Plugins of web application.
 */
export interface IPluginContextValue {
    getRoute: (pluginId: string, viewId: string) => Promise<React.ReactNode>;
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
