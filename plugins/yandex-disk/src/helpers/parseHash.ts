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
    for (const x of formatedHash) {
        const kvPair = x.split('=');
        switch (kvPair[0]) {
            case 'access_token':
                result.token = kvPair[1];
                continue;
            case 'token_type':
                result.type = kvPair[1];
                continue;
            case 'expires_in':
                result.expiresIn = Number.parseInt(kvPair[1], 10);
                continue;
        }
    }
    return result;
}
