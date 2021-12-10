import React, { SyntheticEvent } from 'react';

import { SvgIcon } from '@/shared/ui';

import { GlobalThemeVariables } from '../themes/theme.css';
import { useBaseClassName } from '../utils/useBaseClassName';

import { svgButton } from './index.css';

export interface SvgButtonProperties {
    src: string;
    type?: keyof GlobalThemeVariables['button']['background'];
    onClick: (event: SyntheticEvent) => void;
    className?: string;
}

export const SvgButton: React.VFC<SvgButtonProperties> = ({ src, type = 'primary', onClick, className }) => {
    const baseClassName = useBaseClassName({ className }, svgButton({ type }));
    return <SvgIcon role="button" src={src} onClick={onClick} className={baseClassName}></SvgIcon>;
};
