/**
 * Provide access for settings
 */
export abstract class PluginSettingsConnection<T> {
    constructor(pluginId: string);
    get(): Promise<T>;
    addOrUpdate<T>(conf: T): Promise<boolean>;
    delete(): Promise<boolean>;
}

export interface ExtensionDb {
    path: string;
    id: string;
    enabled: boolean;
}

export abstract class PluginConnection {
    getExtensionById(id: string): Promise<ExtensionDb>;
    updateExtension(db: ExtensionDb): Promise<boolean>;
    deleteExtension(id: string): Promise<boolean>;
}
