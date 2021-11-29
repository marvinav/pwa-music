import React from 'react';

import { spinner, spinnerDiv } from './index.css';

export const Spinner: React.VFC = () => (
    <div className={spinner}>
        <div className={spinnerDiv}></div>
        <div className={spinnerDiv}></div>
        <div className={spinnerDiv}></div>
        <div className={spinnerDiv}></div>
    </div>
);
