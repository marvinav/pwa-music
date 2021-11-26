import Dexie from 'dexie';
import { StorageEntry } from './types';

export class FileSystemDb {
    private readonly pluginStorageKey: string;
    private readonly store: Dexie.Table<StorageEntry, [string, string]>;
    private readonly rootPath: string;

    constructor(provider: string, rootPath = '/') {
        const db = new Dexie(`file-system.dexie.${provider}`);
        db.version(1).stores({
            files: '[path+name], path',
        });
        this.store = db.table('files');
        this.rootPath = rootPath;
    }

    async addOrUpdateEntry(path: string, name: string, entry: StorageEntry): Promise<string> {
        const query: StorageEntry = { ...entry, path, name };
        const rootPath = (function () {
            const index = path.lastIndexOf(name);
            if (index > -1) {
                return path.substring(0, index);
            }
            return null;
        })();
        if (path !== this.rootPath) {
            const rootDir = await this.store.filter((x) => {
                return x._ === 'directory' && x.path === rootPath;
            });
            if (!(await rootDir.first())) {
                throw new Error('Root dir not created');
            }
        }
        return (await this.store.put(query)).join('-');
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
            (await this.store.where({ path, name })).delete();
        }

        const newFile = { ...oldFile, path: newPath, name: newName ?? name };
        return (await this.store.add(newFile)).join('-');
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
            .filter((obj) => {
                return obj.path.startsWith(path);
            })
            .delete();
        return true;
    }
}
