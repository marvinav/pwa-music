/* Этот файлик существует просто для того,
чтобы Typescript не ругался на неизвестные модули,
или модули без типов */
declare module '*.svg';
declare module '*.svg?raw';
declare module '*.jpeg';
declare module '*.jpg';
declare module '*.png';
declare module '*.gif';
declare module '*.json';
declare module '*.json?raw' {
    type dictionary = {
        [key: string]: string;
    };
    export default dictionary;
}
declare module 'webpack-assets.json' {
    type assets = {
        [key: string]: string;
    };
    export default assets;
}
