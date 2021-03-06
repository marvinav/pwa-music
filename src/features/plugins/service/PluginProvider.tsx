import React from 'react';

import { PluginSettingsModel } from '@/entities/plugins';
import { HandShake, LoadingView, Manifest, Plugin, View } from '@/entities/plugins/types';
import { env } from '@/shared/env/env';

import { pluginManager } from '../service/PluginManager';
import { IPluginContextValue } from '../types';

import { PluginContext } from './PluginContext';

export const PluginProvider: React.FC = (properties) => {
    const plugin = usePlugin();
    return <PluginContext.Provider value={plugin}>{properties.children}</PluginContext.Provider>;
};

const createPluginSource = (plugin: Manifest) => {
    return `${plugin.src ?? env.CORE_PLUGIN_SOURCE}/${plugin.id}/${plugin.entry}`;
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
                return;
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

    const getSettings = React.useCallback(
        (author: string, pluginId: string) => {
            const plugin = plugins?.find((x) => x.id === pluginId);
            if (!plugin) {
                return;
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
            return loaded.settings as View;
        },
        [loadedPlugins, plugins],
    );

    React.useEffect(() => {
        pluginManager.loadPlugins().then(setPlugins);
    }, []);

    return {
        getRoute,
        getSettings,
    };
};

interface Constructable<T> {
    new (handShake: HandShake<unknown>): T;
}
