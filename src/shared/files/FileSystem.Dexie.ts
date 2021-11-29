import Dexie from 'dexie';

import { StorageEntry } from './types';

export class FileSystemDataBase {
    private readonly pluginStorageKey: string;
    private readonly store: Dexie.Table<StorageEntry, [string, string]>;
    private readonly rootPath: string;

    constructor(provider: string, rootPath = '/') {
        const database = new Dexie(`file-system.dexie.${provider}`);
        database.version(1).stores({
            files: '[path+name], path',
        });
        this.store = database.table('files');
        this.rootPath = rootPath;
    }

    async addOrUpdateEntry(path: string, name: string, entry: StorageEntry): Promise<string> {
        const query: StorageEntry = { ...entry, path, name };
        const rootPath = (function () {
            const index = path.lastIndexOf(name);
            if (index > -1) {
                return path.slice(0, Math.max(0, index));
            }
            return;
        })();
        if (path !== this.rootPath) {
            const rootDirectory = await this.store.filter((x) => {
                return x._ === 'directory' && x.path === rootPath;
            });
            if (!(await rootDirectory.first())) {
                throw new Error('Root dir not created');
            }
        }
        const { join } = await this.store.put(query);
        return join('-');
    }

    async copyFile(
        path: string,
        newPath: string,
        name: string,
        newName?: string,
        removeOld?: boolean,
    ): Promise<string> {
        const oldFile = await this.store.get({ path, name });
        if (oldFile._ === 'directory') {
            throw new Error('Directory copy not implemented');
        }
        if (removeOld) {
            this.store.where({ path, name }).delete();
        }

        const newFile = { ...oldFile, path: newPath, name: newName ?? name };
        const { join } = await this.store.add(newFile);
        return join('-');
    }

    async getMetaInfo(path: string, name: string): Promise<StorageEntry> {
        return await this.store.get({ path, name });
    }

    async getDirectoryStructure(path: string): Promise<StorageEntry[]> {
        const result = await this.store.where({ path });
        return result.toArray();
    }

    async delete(path: string, name: string): Promise<boolean> {
        await this.store.delete([path, name]);
        await this.store
            .filter((object) => {
                return object.path.startsWith(path);
            })
            .delete();
        return true;
    }
}
