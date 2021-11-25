import React from 'react';
import { Layer } from '../../components/Layer';
import { bottomBar } from './index.css';

export const BottomBar: React.FC = (props) => {
    return (
        <Layer level={0} className={bottomBar}>
            {props.children}
        </Layer>
    );
};
