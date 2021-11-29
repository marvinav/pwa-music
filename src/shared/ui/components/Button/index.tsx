import PropTypes from 'prop-types';
import React, { HTMLAttributes } from 'react';

import { BaseComponentProperties } from '../types';
import { useBaseClassName } from '../utils/useBaseClassName';

import { button, ButtonVariants } from './index.css';

export const Button: React.VFC<
    React.DetailedHTMLProps<HTMLAttributes<HTMLButtonElement>, HTMLButtonElement> &
        BaseComponentProperties<ButtonVariants>
> = (properties) => {
    const baseClassName = useBaseClassName(properties, button(properties.variants));

    let nestedProperties = {} as typeof properties;
    if (properties) {
        nestedProperties = { ...properties };
        delete nestedProperties.variants;
    }

    return (
        <button
            onClick={(event) => {
                event.preventDefault();
                properties.onClick && properties.onClick(event);
            }}
            {...nestedProperties}
            className={baseClassName}
        ></button>
    );
};

Button.propTypes = {
    onClick: PropTypes.func,
};
