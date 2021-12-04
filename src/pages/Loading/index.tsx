import React from 'react';

import { Spinner } from '@/shared/ui';

const style = {
    height: '100vh',
    width: '100vw',
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: 'var(--main-color)',
};

export const Loading: React.VFC = () => {
    return (
        <div style={style}>
            <Spinner></Spinner>
        </div>
    );
};
