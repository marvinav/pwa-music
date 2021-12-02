import React from 'react';

import { SvgIcon } from 'shared/ui';
import Close from 'static/assets/window/close.svg?raw';
import Minus from 'static/assets/window/minus.svg?raw';

import { controlButton, icons, topBar } from './index.css';

interface TopBarProperties {
    title: string;
    onMimimize: () => void;
    onClose: () => void;
}

const TopBar: React.VFC<TopBarProperties> = (properties) => {
    return (
        <div className={topBar}>
            <div className="title">{properties.title}</div>
            <div className={controlButton}>
                <SvgIcon
                    src={Minus}
                    className={icons({ action: 'minimize' })}
                    onClick={properties.onMimimize}
                ></SvgIcon>
                <SvgIcon src={Close} className={icons({ action: 'close' })} onClick={properties.onClose}></SvgIcon>
            </div>
        </div>
    );
};

const TopBarMemo = React.memo(TopBar, (previous, next) => {
    return (
        previous.title === next.title && previous.onClose === next.onClose && previous.onMimimize === next.onMimimize
    );
});

export { TopBarMemo as TopBar };
