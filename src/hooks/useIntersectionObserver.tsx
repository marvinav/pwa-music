// https://github.com/billyjacoby/intersection-observer-hooks

import { useState, useEffect, MutableRefObject } from 'react';

interface IntersactionObserverProps {
    threshold: number;
    root?: Element | Document | null;
    rootMargin?: string;
}

export const useIntersectionObserver = (
    ref: MutableRefObject<Element>,
    options: IntersactionObserverProps,
): [boolean, IntersectionObserver] => {
    const { threshold, root, rootMargin } = options;
    // configure the state
    const [state, setState] = useState<{
        inView: boolean;
        triggered: boolean;
        entry: IntersectionObserver;
    }>({
        inView: false,
        triggered: false,
        entry: undefined,
    });

    const observer = new IntersectionObserver(
        (entries, observerInstance) => {
            // checks to see if the element is intersecting
            if (entries[0].intersectionRatio > 0) {
                // if it is update the state, we set triggered as to not re-observe the element
                setState({
                    inView: true,
                    triggered: true,
                    entry: observerInstance,
                });
                // unobserve the element
                observerInstance.unobserve(ref.current);
            }
            return;
        },
        {
            threshold: threshold || 0,
            root: root || null,
            rootMargin: rootMargin || '0%',
        },
    );

    useEffect(() => {
        if (ref.current) {
            observer.observe(ref.current);
        }
    });

    return [state.inView, state.entry];
};
