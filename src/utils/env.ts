/**
 * Environments from webpack builds
 */

declare const webpack_env: {
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
};

declare global {
    export interface Window {
        env: typeof webpack_env;
    }
}
// Self assign because webpack.DefinePlugin
// by default only replace variable,
// eslint-disable-next-line no-self-assign
window.env = { ...webpack_env };

export const env = window.env;