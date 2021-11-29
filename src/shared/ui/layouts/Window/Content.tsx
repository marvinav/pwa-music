import React from 'react';

import { Layer } from '../../components/Layer';
import { container } from '../../components/utils/container.css';

export const Content: React.FC = (properties) => {
    return (
        <Layer level={1} className={container()}>
            {properties.children}
        </Layer>
    );
};
