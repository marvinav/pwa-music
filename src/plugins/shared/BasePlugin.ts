import { ReactElement } from 'react';
import { StorageProvider } from './interfaces/StorageProvider';

export type ViewScope = SettingsMainScope | 'home.widget' | 'route.main';

export type SettingsMainScope = 'settings.main';
export type HomeWidgetScope = 'home.widget';
export type RouteMainScope = 'route.main';

export type View = ReactView;

export type BaseView = {
    id: string;
    scope: ViewScope;
};

export interface ReactView extends BaseView {
    _: 'reactView';
    render: (container: Element) => ReactElement;
}

export type Permissions = '';

export abstract class BasePlugin {
    manifest: {
        id: string;
        name: string;
        version: string;
        permissions?: Permissions;
        type: 'storage-provider' | 'view';
    };
}

export abstract class StorageProviderPlugin<T> extends BasePlugin {
    settings: Omit<View, 'scope'> & { scope: SettingsMainScope };
    provider: (settings: T) => StorageProvider<T>;
    views?: View[];
}

export abstract class ViewPlugin extends BasePlugin {
    settings: Omit<View, 'scope'> & { scope: SettingsMainScope };
    views?: View[];
}
