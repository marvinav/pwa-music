import { ReactElement } from 'react';
import { StorageProvider } from './interfaces/StorageProvider';

export type ViewScope = SettingsMainScope | 'home.widget' | 'route.main';

export type SettingsMainScope = 'settings.main';
export type HomeWidgetScope = 'home.widget';
export type RouteMainScope = 'route.main';

export type View = ReactView | LoadingView;

export type BaseView = {
    id: string;
    scope: ViewScope;
};

export interface ReactView extends BaseView {
    _: 'reactView';
    render: () => ReactElement;
}

export type Permissions = '';

export abstract class BasePlugin {
    manifest: Manifest;
    settings: Omit<View, 'scope'> & { scope: SettingsMainScope };
    views?: View[];
}

export abstract class StorageProviderPlugin<T> extends BasePlugin {
    type: 'storage-provider';
    provider: (settings: T) => StorageProvider<T>;
}

export abstract class ViewPlugin extends BasePlugin {
    type: 'view';
    views: View[];
}

export interface LoadingView extends BaseView {
    _: 'loading';
}

export type Plugin<T> = StorageProviderPlugin<T> | ViewPlugin;

export type Manifest = IBaseManifest;

export interface IBaseManifest {
    id: string;
    name: string;
    author: string;
    description: string;
    src?: string;
    version: `${number}.${number}.${number}`;
    entry: string;
    type: 'view' | 'storage-provider';
    views?: Omit<View, 'render'>[];
    settings: Omit<View, 'scope' | 'render'> & { scope: SettingsMainScope };
}
