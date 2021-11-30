import React from 'react';

import { useSafeDispatch } from './useSafeDispatch';

/**
 * State of the `useNotification` hook (Managed by the NotificationReducer).
 */
interface State {
    permission: null | NotificationPermission;
    error: null | Error;
}

/**
 * Action passed to the NotificationReducer.
 */
type Action = Partial<State>;

type NotificationReducer = (previousState: State, action: Action) => State;

/** True if the code is being executed on the server. */
const isServer = typeof window === 'undefined';

/** True if the Web Notification API is supported. */
const isSupported = !isServer && 'Notification' in window;

interface UseNotificationReturnType {
    /**
     * Represents the permission status for displaying web notifications on
     * the current origin.
     */
    permission: null | NotificationPermission; // 'default' | 'denied' | 'granted'
    /**
     * Any error thrown while initializing the Notification constructor.
     */
    error: null | Error;
    /**
     * Requests permission to display web notifications.
     */
    requestPermission: () => Promise<void>;
    /**
     * Triggers a web notification.
     *
     * Note: The function signature matches the web Notification constructor one
     * to one. See the MDN documentation for more information:
     * https://developer.mozilla.org/en-US/docs/Web/API/Notification
     */
    notify: (title: Notification['title'], options?: NotificationOptions) => null | Notification;
}

export function useNotification(): UseNotificationReturnType {
    const [{ permission, error }, setState] = React.useReducer<NotificationReducer>(
        (previousState, action) => ({ ...previousState, ...action }),
        {
            permission: isSupported ? Notification.permission : undefined,
            error: !isSupported ? new Error('This browser does not support web notifications.') : undefined,
        },
    );

    const safeSetState = useSafeDispatch(setState);

    const requestPermission = React.useCallback(async () => {
        try {
            if (!isSupported || permission !== 'default') return;

            const notificationPermission = await Notification.requestPermission();

            // Update permission status and clear out any errors.
            safeSetState({
                permission: notificationPermission,
                error: undefined,
            });
        } catch {
            // Fallback to the deprecated callback API.
            Notification.requestPermission((notificationPermission) => {
                // Update permission status and clear out any errors.
                safeSetState({
                    permission: notificationPermission,
                    error: undefined,
                });
            });
        }
    }, [permission, safeSetState]);

    const notify = React.useCallback(
        (title: Notification['title'], options?: NotificationOptions) => {
            if (!isSupported || permission !== 'granted') return;

            try {
                const notification = new Notification(title, options);

                // Clear out possible errors in state.
                safeSetState({ error: undefined });

                return notification;
            } catch (error) {
                if (error instanceof Error) {
                    safeSetState({ error });
                }

                return;
            }
        },
        [permission, safeSetState],
    );

    return {
        permission,
        error,
        requestPermission,
        notify,
    };
}

export default useNotification;
