import React from 'react';

import close from 'static/assets/window/close.svg?raw';
import minus from 'static/assets/window/minus.svg?raw';

import { Layer } from '../../components/Layer';
import { SvgIcon } from '../../components/SvgIcon';

import { controlButton, icons, topBar, window } from './index.css';
// import minimize from 'static/assets/window/minimize.svg?raw';
// import maximize from 'static/assets/window/maximize.svg?raw';

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
            <div className={topBar}>
                <div className="title">{properties.title}</div>
                <div className={controlButton}>
                    <SvgIcon src={minus} className={icons({ action: 'minimize' })}></SvgIcon>
                    <SvgIcon src={close} className={icons({ action: 'close' })}></SvgIcon>
                </div>
            </div>
            {properties.children}
        </Layer>
    );
};

function useClassname(properties: WindowProperties) {
    const classess = [window];
    properties.className && classess.push(properties.className);
    return classess.join(' ');
}
