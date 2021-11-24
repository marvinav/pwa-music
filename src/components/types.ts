import { RuntimeFn, VariantSelection } from '@vanilla-extract/recipes/dist/declarations/src/types';

// Enums
export type Size = 'xs' | 's' | 'normal' | 'l' | 'xl';
export type DeviceSize = 's' | 'm' | 'l' | 'xl' | 'xxl';
export type PaddinSize = '0' | 's' | 'normal' | 'l';

// Helpers
export type DeepPartial<T> = T extends Record<string, unknown> ? { [P in keyof T]?: DeepPartial<T[P]> } : T;
export type VariantProps<U> = U extends RuntimeFn<infer N> ? VariantSelection<N> : null;

// Interfaces
export interface BaseComponentProps<T = void> {
    className?: string;
    variants?: T;
}
