import { style } from '@vanilla-extract/css';
import { globalThemeVars } from '../themes/theme.css';

export const buttonClass = style({
    backgroundColor: globalThemeVars.button.background.primary,
    color: globalThemeVars.button.color.primary,
    border: globalThemeVars.button.border.primary,
    boxShadow: globalThemeVars.button.shadow.primary,
});

// .button {
//     background-color: var(--button-background-primary);
//     color: var(--button-color-primary);
//     border: var(--button-border-primary);
//     box-shadow: var(--button-shadow-primary);
// }

// .button-ghost {
//     background-color: none;
// }

// Buttons pseudo state:
// hover pseudo
// active pseudo
// focus pseudo '#44335a'

// Buttons state
// primary: '#6272a4',
// submit: '#50fa7b',
// danger: '#ff5555',
// disabled: '#191A21',
// focused: '#44335a',
