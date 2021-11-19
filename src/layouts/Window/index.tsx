import React from 'react';
import { SvgIcon } from '../../components/SvgIcon';
import './index.scss';

import close from '../../../static/assets/window/close.svg?raw';
// import minimize from '../../../static/assets/window/minimize.svg?raw';
// import maximize from '../../../static/assets/window/maximize.svg?raw';
import minus from '../../../static/assets/window/minus.svg?raw';

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
        <div className={useClassname(props)}>
            <div className="top-bar">
                <div className="title">{props.title}</div>
                <div className="control-button">
                    <SvgIcon src={minus} size={'s'} button={true} rounded={true} className="minimize"></SvgIcon>
                    <SvgIcon src={close} size={'s'} button={true} rounded={true} className="close"></SvgIcon>
                </div>
            </div>
            <div className="view paper-1 container">{props.children}</div>
        </div>
    );
};

function useClassname(props: WindowProps) {
    const classess = ['window paper-0 focusable'];
    props.className && classess.push(props.className);
    props.fullSize && classess.push('full-screen');
    return classess.join(' ');
}
