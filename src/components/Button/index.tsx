import React, { HTMLAttributes } from 'react';
import PropTypes from 'prop-types';
import { buttonClass } from './index.css';
import { BaseComponentProps } from '../types';
import { useBaseClassName } from '../utils/useBaseClassName';

export const Button: React.VFC<
    React.DetailedHTMLProps<HTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & BaseComponentProps
> = (props) => {
    const baseClassName = useBaseClassName(props, buttonClass);

    return (
        <button
            onClick={(e) => {
                e.preventDefault();
                props.onClick && props.onClick(e);
            }}
            {...props}
            className={baseClassName}
        ></button>
    );
};

Button.propTypes = {
    onClick: PropTypes.func,
};
