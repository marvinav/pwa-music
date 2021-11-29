/* eslint-disable unicorn/prevent-abbreviations */
/**
 * Environments from webpack builds
 */
declare const webpack_environment: {
    /**
     * Should be service worker registered
     */
    SERVICE_WORKER: boolean;
    /**
     * Serve mode
     */
    MODE: 'development' | 'production' | 'none';
    /**
     * Version
     */
    VERSION: `${number}.${number}.${number}`;
    /**
     * Url addres of webpack assets file
     */
    WEBPACK_ASSET: string;
    /**
     * Core plugin Source url
     */
    CORE_PLUGIN_SOURCE: string;
    /**
     * Git hub Avatar
     */
    GIT_HUB_AVATAR: string;
};

declare global {
    export interface Window {
        env: typeof webpack_environment;
    }
}
// Self assign because webpack.DefinePlugin
// by default only replace variable,
// eslint-disable-next-line no-self-assign

if (self.window) {
    window.env = { ...webpack_environment };
} else {
    self.env = { ...webpack_environment };
}

export const env = self.window ? window.env : self.env;
