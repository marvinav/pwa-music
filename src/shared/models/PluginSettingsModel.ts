import localforage from 'localforage';
import { PluginSettingsConnection } from '../files/types';

export class PluginSettingsModel<T> extends PluginSettingsConnection<T> {
    private readonly pluginStorageKey: string;
    private readonly store: typeof localforage;

    constructor(author: string, pluginId: string) {
        super(pluginId);
        this.store = localforage.createInstance({ name: 'plugin-settings' });
        this.pluginStorageKey = `${author}.${pluginId}`;
    }
    async get(): Promise<T> {
        return await this.store.getItem<T>(this.pluginStorageKey);
    }
    async addOrUpdate(s: T): Promise<boolean> {
        const result = await this.store.setItem<T>(this.pluginStorageKey, s);
        return result != null;
    }

    async delete(): Promise<boolean> {
        await this.store.removeItem(this.pluginStorageKey);
        return true;
    }
}
