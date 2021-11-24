import React from 'react';
import { SvgIcon } from '../../components/SvgIcon';

import close from '../../../static/assets/window/close.svg?raw';
// import minimize from '../../../static/assets/window/minimize.svg?raw';
// import maximize from '../../../static/assets/window/maximize.svg?raw';
import minus from '../../../static/assets/window/minus.svg?raw';
import { Layer } from '../../components/Layer';
import { controlButton, icons, topBar, window } from './index.css';
import { container } from '../../components/utils/container.css';

export interface WindowProps {
    title: string;
    onClose?: () => void;
    onMimimize?: () => void;
    onOpen?: () => void;
    fullSize?: boolean;
    className?: string;
}

const minimizeClassName = `${icons} minimize`;
const closeClassName = `${icons} close`;

export const Window: React.FC<WindowProps> = (props) => {
    return (
        <Layer level={0} className={useClassname(props)}>
            <div className={topBar}>
                <div className="title">{props.title}</div>
                <div className={controlButton}>
                    <SvgIcon src={minus} className={minimizeClassName}></SvgIcon>
                    <SvgIcon src={close} className={closeClassName}></SvgIcon>
                </div>
            </div>
            <Layer level={1} className={container()}>
                {props.children}
            </Layer>
        </Layer>
    );
};

function useClassname(props: WindowProps) {
    const classess = [window];
    props.className && classess.push(props.className);
    props.fullSize && classess.push('full-screen');
    return classess.join(' ');
}
