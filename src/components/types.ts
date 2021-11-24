import { RuntimeFn, VariantSelection } from '@vanilla-extract/recipes/dist/declarations/src/types';

export type Size = 'xs' | 's' | 'normal' | 'l' | 'xl';
export interface BaseComponentProps<T = void> {
    className?: string;
    classes?: (
        | `margin-${0 | Size}`
        | `padding-${0 | Size}`
        | `bordered`
        | `size-${Size}`
        | `rectangle-size-${Size}`
        | 'rounded'
        | 'button'
    )[];
    variants?: T;
}

export type DeepPartial<T> = T extends Record<string, unknown> ? { [P in keyof T]?: DeepPartial<T[P]> } : T;
export type VariantProps<U> = U extends RuntimeFn<infer N> ? VariantSelection<N> : null;
