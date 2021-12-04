import React from 'react';

import { useDictionary } from '@/entities/dictionary';

const NotFoundLayout: React.VFC = () => {
    const { d } = useDictionary();
    return <div>{d('Error')}</div>;
};

export default NotFoundLayout;
