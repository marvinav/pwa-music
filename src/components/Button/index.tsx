import React, { HTMLAttributes } from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import { BaseComponentProps } from '../types';
import { useBaseClassName } from '../utils/useBaseClassName';

export const Button: React.VFC<
    React.DetailedHTMLProps<HTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & BaseComponentProps
> = (props) => {
    const baseClassName = useBaseClassName(props, 'button-container');

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
