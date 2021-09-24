export class YandexDiskClient {
    readonly oauthRequestUrlToken: string;
    private readonly clientId: string;
    private readonly deviceId: string;
    private readonly deviceName: string;

    constructor(clientId: string, deviceId: string, deviceName: string) {
        this.clientId = clientId;
        this.deviceId = deviceId;
        this.deviceName = deviceName;
        const url = new URL('https://oauth.yandex.com/authorize');
        url.searchParams.set('response_type', 'token');
        url.searchParams.set('client_id', this.clientId);
        url.searchParams.set('device_id', this.deviceId);
        url.searchParams.set('device_name', this.deviceName);
        this.oauthRequestUrlToken = url.toString();
    }
}
