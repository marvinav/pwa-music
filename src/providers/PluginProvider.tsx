import React from 'react';
import { CorePluginSource } from '../constants';

import { PluginContext, IPluginContextValue } from '../contexts/PluginContext';
import { PluginSettingsModel } from '../models/PluginSettingsModel';
import { HandShake, LoadingView, Manifest, Plugin, View } from '../plugins/shared/BasePlugin';
import { pluginManager } from '../services/PluginManager';

export const PluginProvider: React.FC = (props) => {
    const plugin = usePlugin();
    return <PluginContext.Provider value={plugin}>{props.children}</PluginContext.Provider>;
};

const createPluginSource = (plugin: Manifest) => {
    return `${plugin.src ?? CorePluginSource}/${plugin.id}/${plugin.entry}`;
};

const loadingMock: LoadingView = {
    _: 'loading',
    id: 'loading',
    scope: 'route.main',
};

// Реализация контекста словаря посредством загрузки json схем, которые хранятся в static
const usePlugin = (): IPluginContextValue => {
    const [plugins, setPlugins] = React.useState<Manifest[]>([]);
    const [loadedPlugins, setLoadedPlugins] = React.useState<Record<string, Plugin<unknown>>>({});

    const getRoute = React.useCallback(
        (pluginId: string, viewId: string): View => {
            const plugin = plugins?.find((x) => x.id === pluginId);
            const view = plugin?.views?.find((x) => x.id === viewId && x.scope === 'route.main');
            if (!plugin || !view) {
                return null;
            }
            const loaded = loadedPlugins[pluginId];

            if (!loaded) {
                requirejs(
                    [createPluginSource(plugin)],
                    function (loadedPlugin: { default: Constructable<Plugin<unknown>> }) {
                        setLoadedPlugins((p) => {
                            p[pluginId] = new loadedPlugin.default({
                                settings: new PluginSettingsModel(plugin.author, pluginId),
                            });
                            return { ...p };
                        });
                    },
                );
                return loadingMock;
            }
            return loaded.views?.find((x) => x.id === view.id);
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

interface Constructable<T> {
    new (handShake: HandShake<unknown>): T;
}
