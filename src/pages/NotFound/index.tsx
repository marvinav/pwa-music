import { useDictionary } from 'entities/dictionary';
import React from 'react';

const NotFoundLayout: React.VFC = () => {
    const { d } = useDictionary();
    return <div>{d('Error')}</div>;
};

export default NotFoundLayout;
