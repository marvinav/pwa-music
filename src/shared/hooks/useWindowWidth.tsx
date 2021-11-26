import { useState, useEffect, useRef, useCallback } from 'react';

// Hook
export const useWindowWidth = (): number => {
    const isClient = typeof window === 'object'; //Object represents browser window
    const lastWidth = useRef<number>();

    const getSize = useCallback(() => {
        return isClient ? window.innerWidth : undefined;
    }, [isClient]);

    const [windowSize, setWindowSize] = useState(getSize);

    useEffect(() => {
        if (!isClient) {
            return;
        } //Exit if not user/browser

        function handleResize() {
            if (window?.innerWidth !== lastWidth.current) {
                const width = getSize();
                lastWidth.current = width;
                setWindowSize(width);
            }
        }
        window.addEventListener('resize', handleResize); // <-- I am only interested in window.innerWidth !
        return () => window.removeEventListener('resize', handleResize);
    }, [getSize, isClient]); // Empty array ensures that effect is only run on mount and unmount

    return windowSize;
};
