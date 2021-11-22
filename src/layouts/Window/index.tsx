import React from 'react';
import { SvgIcon } from '../../components/SvgIcon';
import './index.scss';

import close from '../../../static/assets/window/close.svg?raw';
// import minimize from '../../../static/assets/window/minimize.svg?raw';
// import maximize from '../../../static/assets/window/maximize.svg?raw';
import minus from '../../../static/assets/window/minus.svg?raw';
import { BaseComponentProps } from '../../components/types';
import { Layer } from '../../components/Layer';

export interface WindowProps {
    title: string;
    onClose?: () => void;
    onMimimize?: () => void;
    onOpen?: () => void;
    fullSize?: boolean;
    className?: string;
}

const IconClasses: BaseComponentProps['classes'] = ['rectangle-size-s', 'rounded', 'button'];

export const Window: React.FC<WindowProps> = (props) => {
    return (
        <Layer level={'layer-0'} classes={['rounded', 'bordered']} className={useClassname(props)}>
            <div className="top-bar">
                <div className="title">{props.title}</div>
                <div className="control-button">
                    <SvgIcon src={minus} classes={IconClasses} className="minimize"></SvgIcon>
                    <SvgIcon src={close} classes={IconClasses} className="close"></SvgIcon>
                </div>
            </div>
            <Layer className="view container" level={'layer-1'} classes={['margin-s']}>
                {props.children}
            </Layer>
        </Layer>
    );
};

function useClassname(props: WindowProps) {
    const classess = ['window'];
    props.className && classess.push(props.className);
    props.fullSize && classess.push('full-screen');
    return classess.join(' ');
}
