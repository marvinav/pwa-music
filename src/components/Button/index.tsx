import React, { HTMLAttributes } from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import { BaseComponentProps, useBaseClassName } from '..';

export const Button: React.VFC<
    React.DetailedHTMLProps<HTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & BaseComponentProps
> = (props) => {
    const baseClassName = useBaseClassName(props);

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
