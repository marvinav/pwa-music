import React from 'react';
import './index.scss';
export interface WindowProps {
    title: string;
    onClose: () => void;
    onMimimize: () => void;
    onOpen: () => void;
    fullSize?: boolean;
    className?: string;
}

export const Window: React.FC<WindowProps> = (props) => {
    return (
        <div className={useClassname(props)}>
            <div className="top-bar">
                <div className="title">{props.title}</div>
            </div>
            <div className="view paper-1 container">{props.children}</div>
        </div>
    );
};

function useClassname(props: WindowProps) {
    const classess = ['window paper-0 container'];
    props.className && classess.push(props.className);
    props.fullSize && classess.push('full-screen');
    return classess.join(' ');
}
