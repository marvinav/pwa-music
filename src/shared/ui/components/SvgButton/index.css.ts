import { ComplexStyleRule, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { rectangle } from '../index.css';
import { globalThemeVariables as globalThemeVariables } from '../themes/theme.css';
import { VariantProperties as VariantProperties } from '../types';

export const svgButtonClass = style({
    color: globalThemeVariables.button.color.primary,
});

const svgButtonTypes = ['primary', 'danger', 'disabled', 'focused', 'submit'];

const type = {} as typeof globalThemeVariables.button.background;

for (const x of svgButtonTypes) {
    type[x] = {
        color: globalThemeVariables.button.background[x],
        selectors: {
            '&:hover': {
                color: globalThemeVariables.button.background.focused,
            },
        },
        flexShrink: 0,
    } as ComplexStyleRule;
}

export const svgButton = recipe({
    variants: {
        type,
        rectangle,
    },
    defaultVariants: {
        type: 'primary',
        rectangle: 'normal',
    },
});

export type SvgButtonVariants = VariantProperties<typeof svgButton>;
