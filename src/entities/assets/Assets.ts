import { env } from 'shared/env/env';
import { cachedFetch } from 'shared/utils/helpers';

import { AssetBase, AssetEntry, RawAsset } from './types';

export class Assets {
    private _assets: AssetEntry[];
    private url: string;

    async loadAssets(url: string = env.WEBPACK_ASSET): Promise<AssetEntry[]> {
        this.url = url;
        const response = await cachedFetch(url);
        const assets = await response.json();
        if (assets) {
            this._assets = flatAsset(assets);
        }
        return this.assets;
    }

    get assets(): AssetEntry[] {
        return this._assets;
    }

    async getCoreAssetsUrls(): Promise<string[]> {
        if (!this._assets) {
            await this.loadAssets(this.url);
        }
        return this._assets.filter((x) => !x.path.startsWith('/public')).map((x) => x.path);
    }
}

export function flatAsset(assets: RawAsset): AssetEntry[] {
    const result: AssetEntry[] = [];
    for (const name of Object.getOwnPropertyNames(assets)) {
        const value = assets[name];
        if (typeof value === 'string') {
            const parsed = parseFileName(value);
            parsed && result.push(parseFileName(value));
        } else if (Array.isArray(value)) {
            for (const x of value) {
                const parsed = parseFileName(x);
                parsed && result.push(parsed);
            }
        } else {
            const parsed = flatAsset(value as RawAsset);
            parsed && result.push(...parsed);
        }
    }
    return result;
}

export function parseFileName(fileName: string): AssetEntry {
    const lastPaths = fileName.split('/');
    const lastPath = lastPaths[lastPaths.length - 1];
    const splitted = lastPath.split('.');

    const baseAssets: AssetBase = {
        path: fileName,
        id: splitted[0],
    };

    if ((splitted[2] === 'chunk' || splitted[2] === 'bundle') && splitted[3] === 'js') {
        return { ...baseAssets, contenthash: splitted[1], ext: splitted[3], type: splitted[2] };
    }

    if (splitted.length === 2 && splitted[1]) {
        return {
            ...baseAssets,
            type: 'static',
            ext: splitted[1],
        };
    }
}
