import React from 'react';

import { useTheme, draculaTheme } from '../src/shared/ui';

export const decorators = [
    (Story) => {
        useTheme(draculaTheme);
        return (
            <div>
                <Story />
            </div>
        );
    },
];
