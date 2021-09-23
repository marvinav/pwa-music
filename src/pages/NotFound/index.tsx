import React from 'react';
import { useDictionary } from '../../contexts/DictionaryContext';

const NotFoundLayout: React.VFC = () => {
    const { d } = useDictionary();
    return <div>{d('Error')}</div>;
};

export default NotFoundLayout;
