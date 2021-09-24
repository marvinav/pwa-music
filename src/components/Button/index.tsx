import React, { HTMLAttributes } from 'react';
import PropTypes from 'prop-types';
import './index.scss';

export const Button: React.VFC<React.DetailedHTMLProps<HTMLAttributes<HTMLButtonElement>, HTMLButtonElement>> = (
    props,
) => {
    return (
        <button
            onClick={(e) => {
                e.preventDefault();
                props.onClick && props.onClick(e);
            }}
            {...props}
        ></button>
    );
};

Button.propTypes = {
    onClick: PropTypes.func,
};
