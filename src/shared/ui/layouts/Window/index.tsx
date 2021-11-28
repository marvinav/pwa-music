import React from 'react';
import { SvgIcon } from '../../components/SvgIcon';

import { Layer } from '../../components/Layer';
import { controlButton, icons, topBar, window } from './index.css';
import close from 'static/assets/window/close.svg?raw';
// import minimize from 'static/assets/window/minimize.svg?raw';
// import maximize from 'static/assets/window/maximize.svg?raw';
import minus from 'static/assets/window/minus.svg?raw';

export interface WindowProps {
    title: string;
    onClose?: () => void;
    onMimimize?: () => void;
    onOpen?: () => void;
    fullSize?: boolean;
    className?: string;
}

export const Window: React.FC<WindowProps> = (props) => {
    return (
        <Layer level={0} className={useClassname(props)}>
            <div className={topBar}>
                <div className="title">{props.title}</div>
                <div className={controlButton}>
                    <SvgIcon src={minus} className={icons({ action: 'minimize' })}></SvgIcon>
                    <SvgIcon src={close} className={icons({ action: 'close' })}></SvgIcon>
                </div>
            </div>
            {props.children}
        </Layer>
    );
};

function useClassname(props: WindowProps) {
    const classess = [window];
    props.className && classess.push(props.className);
    return classess.join(' ');
}
