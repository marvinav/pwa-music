import React from 'react';
// import ReactDOM from 'react-dom';
import 'regenerator-runtime/runtime';

export class YandexDiskPlugin {
    constructor() {
        console.log('test');
    }

    render(): React.ReactElement {
        return <TestDiv></TestDiv>;
    }
}

export const TestDiv: React.VFC = () => {
    return <div>{'test'}</div>;
};

new YandexDiskPlugin();
