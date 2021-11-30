// usehooks.com
import { useEffect, useRef } from 'react';

export default function useMemoCompare<T>(next: T, compare: (previous_: T, next: T) => T): T {
    // Ref for storing previous value
    const previousReference = useRef<T>();
    const previous = previousReference.current;

    // Pass previous and next value to compare function
    // to determine whether to consider them equal.
    const isEqual = compare(previous, next);

    // If not equal update previousRef to next value.
    // We only update if not equal so that this hook continues to return
    // the same old value if compare keeps returning true.
    useEffect(() => {
        if (!isEqual) {
            previousReference.current = next;
        }
    });

    // Finally, if equal then return the previous value
    return isEqual ? previous : next;
}
