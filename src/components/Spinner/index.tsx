import React from 'react';
import './index.scss';

export const Spinner: React.VFC = () => (
    <div className="spinner lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
    </div>
);
