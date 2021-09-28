import React from 'react';

import { PluginContext, IPluginContextValue } from '../contexts/PluginContext';
import { Manifest, Plugin } from '../plugins/shared/BasePlugin';
import { pluginManager } from '../services/PluginManager';

export const PluginProvider: React.FC = (props) => {
    const plugin = usePlugin();
    return <PluginContext.Provider value={plugin}>{props.children}</PluginContext.Provider>;
};

// Реализация контекста словаря посредством загрузки json схем, которые хранятся в static
const usePlugin = (): IPluginContextValue => {
    const [plugins, setPlugins] = React.useState<Manifest[]>([]);
    const [loadedPlugins, setLoadedPlugins] = React.useState<Record<string, Plugin<unknown>>>({});

    const getRoute = React.useCallback(
        async (pluginId: string, viewId: string) => {
            const plugin = plugins.find((x) => x.id === pluginId);
            const view = plugin?.views.find((x) => x.id === viewId && x.scope === 'route.main');
            if (!plugin && !view) {
                return null;
            }
            const loaded = loadedPlugins[pluginId];
            if (!loaded) {
                requirejs([plugin.entry], function (plugin: { default: Plugin<unknown> }) {
                    setLoadedPlugins((p) => {
                        p[pluginId] = plugin.default;
                        return { ...p };
                    });
                });
            }
            return loaded.views.find((x) => {
                x.id === view.id;
            });
            return null;
        },
        [plugins, loadedPlugins],
    );

    React.useEffect(() => {
        pluginManager.loadPlugins().then(setPlugins);
    }, []);

    return {
        getRoute,
    };
};
