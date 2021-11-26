export interface RawAsset {
    [key: string]: string | RawAsset | Array<string>;
}

export type AssetEntry = AssetBundle | AssetChunk | AssetStatic;
export interface AssetBase {
    path: string;
    id: string;
}

export interface AssetBundle extends AssetBase {
    contenthash: string;
    type: 'bundle';
    ext: 'js';
}

export interface AssetChunk extends AssetBase {
    contenthash: string;
    type: 'chunk';
    ext: 'js';
}

export interface AssetStatic extends AssetBase {
    type: 'static';
    ext: string;
}
