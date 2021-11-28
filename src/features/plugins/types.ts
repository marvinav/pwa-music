import { View } from 'entities/plugins/BasePlugin';

/**
 * Plugins of web application.
 */
export interface IPluginContextValue {
    getRoute: (pluginId: string, viewId: string) => View;
    getSettings: (author: string, pluginId: string) => View;
}
