import React from 'react';
import { Layer } from '../../components/Layer';
import { container } from '../../components/utils/container.css';

export const Content: React.FC = (props) => {
    return (
        <Layer level={1} className={container()}>
            {props.children}
        </Layer>
    );
};
