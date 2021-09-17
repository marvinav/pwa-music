/* Этот файлик существует просто для того,
чтобы Typescript не ругался на неизвестные модули,
или модули без типов */

declare module '*.svg';
declare module '*.jpeg';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.png';

declare module 'webpack-assets.json' {
    type assets = {
        [key: string]: string;
    };
    export default assets;
}
