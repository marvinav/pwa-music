export function createOAuthUrl(clientId: string, deviceId: string, deviceName: string): string {
    const url = new URL('https://oauth.yandex.com/authorize');
    url.searchParams.set('response_type', 'token');
    url.searchParams.set('client_id', clientId);
    url.searchParams.set('device_id', deviceId);
    url.searchParams.set('device_name', deviceName);
    return url.toString();
}
