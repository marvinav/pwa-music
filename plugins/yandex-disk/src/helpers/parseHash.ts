export function parseHash(hash: string): {
    token?: string;
    type?: string;
    expiresIn?: number;
} {
    const formatedHash = hash.slice(1).split('&');
    const result: {
        token?: string;
        type?: string;
        expiresIn?: number;
    } = {};
    formatedHash.forEach((x) => {
        const kvPair = x.split('=');
        switch (kvPair[0]) {
            case 'access_token':
                result.token = kvPair[1];
                return;
            case 'token_type':
                result.type = kvPair[1];
                return;
            case 'expires_in':
                result.expiresIn = parseInt(kvPair[1], 10);
                return;
        }
    });
    return result;
}
