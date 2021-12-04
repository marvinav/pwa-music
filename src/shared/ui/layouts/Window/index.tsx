import React from 'react';

import { Layer } from '../../components/Layer';

import { TopBar } from './TopBar';
import { window } from './index.css';

export interface WindowProperties {
    title: string;
    onClose?: () => void;
    onMimimize?: () => void;
    onOpen?: () => void;
    fullSize?: boolean;
    className?: string;
}

export const Window: React.FC<WindowProperties> = (properties) => {
    return (
        <Layer level={0} className={useClassname(properties)}>
            <TopBar onClose={properties.onClose} onMimimize={properties.onMimimize} title={properties.title} />
            {properties.children}
        </Layer>
    );
};

function useClassname(properties: WindowProperties) {
    const classess = [window];
    properties.className && classess.push(properties.className);
    return classess.join(' ');
}
