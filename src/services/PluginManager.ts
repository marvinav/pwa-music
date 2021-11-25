import { Manifest } from '../plugins/shared/BasePlugin';

interface IPluginMeta {
    id: string;
    url: string;
    name: string;
    description: string;
    version: string;
}

export interface IAddPluginEvent {
    type: 'add-plugin';
    data: IPluginMeta;
}

export class PluginEvent<IAddPluginEvent> extends CustomEvent<IAddPluginEvent> {
    constructor(eventInitDict?: CustomEventInit<IAddPluginEvent>) {
        super('my-space/PluginManager', eventInitDict);
    }
}

declare global {
    export interface Window {
        PluginEvent: typeof PluginEvent;
    }
}

window.PluginEvent = PluginEvent;

export class PluginManager {
    private plugins: Map<string, IPluginMeta> = new Map();

    constructor() {
        addEventListener('my-space/PluginManager', (ev: CustomEventInit<IAddPluginEvent>) => {
            console.log(ev);
        });
    }

    addPlugin(plugin: IPluginMeta): boolean {
        if (this.plugins.has(plugin.id)) {
            return false;
        }
        this.plugins.set(plugin.id, plugin);
        return true;
    }

    getPlugin(id: string): IPluginMeta {
        return this.plugins.get(id);
    }

    async loadPlugins(): Promise<Manifest[]> {
        const defaultPlugins: Manifest[] = [];
        try {
            const manifestResponse = await fetch('/plugins/yandex-disk/manifest.json');
            defaultPlugins.push((await manifestResponse.json()) as Manifest);
        } catch (_err) {
            console.warn('Yandex.Plugin has not been loaded');
        }
        return defaultPlugins;
    }
}

export const pluginManager = new PluginManager();
