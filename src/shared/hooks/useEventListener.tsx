import React from 'react';

// Hook
export function useEventListener<K extends keyof WindowEventMap>(
    eventName: K,
    handler: (event_: WindowEventMap[K]) => void,
    element = window,
): void {
    // Create a ref that stores handler
    const savedHandler = React.useRef(null);

    // Update ref.current value if handler changes.
    // This allows our effect below to always get latest handler ...
    // ... without us needing to pass it in effect deps array ...
    // ... and potentially cause effect to re-run every render.
    React.useEffect(() => {
        savedHandler.current = handler;
    }, [handler]);

    // Create event listener that calls handler function stored in ref
    const eventListener = React.useCallback((event: UIEvent) => savedHandler.current(event), [savedHandler]);

    React.useEffect(
        () => {
            // Make sure element supports addEventListener
            // On
            const isSupported = element && element.addEventListener;
            if (!isSupported) return;

            // Add event listener
            element.addEventListener(eventName, eventListener);

            // Remove event listener on cleanup
            return () => {
                element.removeEventListener(eventName, eventListener);
            };
        },
        [eventName, element, eventListener], // Re-run if eventName or element changes
    );
}
