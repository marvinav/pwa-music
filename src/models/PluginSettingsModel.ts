import localforage from 'localforage';
import PouchDb from 'pouchdb';
import { PluginSettingsConnection } from '../plugins/shared/models/types';

const db = new PouchDb<{ name: string }>('settings');
db.put({ name: '123' });
db.find({name: })

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
