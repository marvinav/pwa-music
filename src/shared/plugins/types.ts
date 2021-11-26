/**
 * Provide access for settings
 */
export abstract class PluginSettingsConnection<T> {
    readonly pluginId: string;
    constructor(pluginId: string) {
        this.pluginId = pluginId;
    }
    abstract get(): Promise<T>;
    abstract addOrUpdate(conf: T): Promise<boolean>;
    abstract delete(): Promise<boolean>;
}

export interface ExtensionDb {
    path: string;
    id: string;
    enabled: boolean;
}

export abstract class PluginConnection {
    abstract getExtensionById(id: string): Promise<ExtensionDb>;
    abstract updateExtension(db: ExtensionDb): Promise<boolean>;
    abstract deleteExtension(id: string): Promise<boolean>;
}
