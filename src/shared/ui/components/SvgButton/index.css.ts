import { ComplexStyleRule, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

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
    } as ComplexStyleRule;
}

export const svgButton = recipe({
    variants: {
        type,
    },
    defaultVariants: {
        type: 'primary',
    },
});

export type SvgButtonVariants = VariantProperties<typeof svgButton>;
