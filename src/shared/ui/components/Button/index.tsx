import React, { HTMLAttributes } from 'react';
import PropTypes from 'prop-types';
import { BaseComponentProps } from '../types';
import { useBaseClassName } from '../utils/useBaseClassName';
import { button, ButtonVariants } from './index.css';

export const Button: React.VFC<
    React.DetailedHTMLProps<HTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & BaseComponentProps<ButtonVariants>
> = (props) => {
    const baseClassName = useBaseClassName(props, button(props.variants));

    let nestedProps = {} as typeof props;
    if (props) {
        nestedProps = { ...props };
        delete nestedProps.variants;
    }

    return (
        <button
            onClick={(e) => {
                e.preventDefault();
                props.onClick && props.onClick(e);
            }}
            {...nestedProps}
            className={baseClassName}
        ></button>
    );
};

Button.propTypes = {
    onClick: PropTypes.func,
};
