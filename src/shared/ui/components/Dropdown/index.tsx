import React from 'react';

import { Layer } from '@/shared/ui';

export const DropDown: React.FC = (properties) => {
    return <Layer level={1}>{properties.children}</Layer>;
};
