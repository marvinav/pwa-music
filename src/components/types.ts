export type Size = 'xs' | 's' | 'normal' | 'l' | 'xl';
export interface BaseComponentProps {
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
}

export type DeepPartial<T> = T extends Record<string, unknown> ? { [P in keyof T]?: DeepPartial<T[P]> } : T;
