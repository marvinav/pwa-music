import PouchDb from 'pouchdb';
import PouchDbFind from 'pouchdb-find';
import { StorageEntry } from '../plugins/shared/models/fileSystem';

PouchDb.plugin(PouchDbFind);

export class FileSystemDb {
    private readonly pluginStorageKey: string;
    private readonly store: PouchDB.Database<StorageEntry>;

    constructor(provider: string) {
        this.store = new PouchDb<StorageEntry>(`pouch.file-system.${provider}`, { auto_compaction: true });
        this.store.createIndex({ index: { fields: ['path', 'name', 'hash'] } });
    }

    async addOrUpdateEntry(entry: StorageEntry): Promise<string> {
        return await (
            await this.store.put({ ...entry, _rev: 'baserevision' }, { force: true })
        ).id;
    }

    async getMetaInfo(path: string, name: string): Promise<StorageEntry> {
        const response = await this.store.find({ selector: { path, name }, limit: 1 });
        return response.docs[0];
    }

    async getDirectoryStructure(path: string): Promise<StorageEntry[]> {
        const result = await this.store.find({ selector: { path } });
        return result.docs;
    }

    async delete(path: string, name: string): Promise<boolean> {
        const file = await this.store.find({ selector: { path, name } });
        await this.store.remove(file.docs[0]);
        const nested = await this.store.find({
            selector: {
                path: { $regex: path },
            },
        });
        2;
        await this.store.bulkDocs(
            nested.docs.map((x) => {
                return {
                    ...x,
                    _deleted: true,
                };
            }),
        );
        return true;
    }
}
