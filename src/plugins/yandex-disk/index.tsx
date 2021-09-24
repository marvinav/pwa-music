import React from 'react';
import { ReactPlugin } from '../shared/BasePlugin';
import { TestDiv } from './App';

export default class YandexDiskPlugin implements ReactPlugin {
    constructor() {
        console.log('test');
    }

    render(): React.ReactElement {
        return <TestDiv></TestDiv>;
    }
}
