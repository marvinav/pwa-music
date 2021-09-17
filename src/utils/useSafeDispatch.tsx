import React from 'react';

/**
 * Prevents updating state on an unmounted component.
 */
export function useSafeDispatch<T>(dispatch: React.Dispatch<T>) {
    const mounted = React.useRef(false);

    React.useLayoutEffect(() => {
        mounted.current = true;

        return () => {
            mounted.current = false;
        };
    }, []);

    return React.useCallback(
        (action: T) => {
            if (mounted.current) dispatch(action);
        },
        [dispatch],
    );
}
