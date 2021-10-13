export async function icyCast(
    url: string,
    requestInit: RequestInit = {},
    processBuffer: (buff: Uint8Array, icyHeaders: string) => Promise<void>,
    onDone: (params: { recieved: number; send: number }) => void,
): Promise<Response['headers']> {
    requestInit = requestInit ?? {};
    requestInit.keepalive = requestInit.keepalive === undefined ? true : requestInit.keepalive;
    requestInit.mode = requestInit.mode ?? 'cors';
    requestInit.headers = requestInit.headers ?? {};
    requestInit.headers['icy-metadata'] = requestInit.headers['icy-metadata'] ?? 1;

    const response = await fetch(url, requestInit);
    const metaInt = Number.parseInt(response.headers.get('icy-metaint'), 10);
    let icyHeaders = null;
    const bodyReader = response.body.getReader();
    let bufferArray = [];
    let length = 0;
    let recieved = 0;
    let send = 0;

    const read = () => {
        bodyReader.read().then(async ({ value, done }) => {
            try {
                // Add new buffer to collected inside one chunk
                if (value && value.length > 0) {
                    bufferArray.push(value);
                    length += value.length;
                    recieved += value.length;
                }

                const mergedArray = new Uint8Array(length);

                // If current buffer doesn`t contain all metadata when skip
                if (metaInt && length < metaInt) {
                    if (!done) {
                        read();
                    } else {
                        let offset = 0;
                        bufferArray.forEach((x) => {
                            mergedArray.set(x, offset);
                            offset += x.length;
                        });
                        send += mergedArray.length;
                        processBuffer && (await processBuffer(mergedArray, icyHeaders));
                        onDone({ recieved, send });
                    }
                    return;
                }

                let offset = 0;
                bufferArray.forEach((x) => {
                    mergedArray.set(x, offset);
                    offset += x.length;
                });
                const icyHeaderLengh = mergedArray[metaInt] ?? 0;
                // If current buffer doesn`t contain all metadata when skip
                if (length < metaInt + icyHeaderLengh * 16 + 1) {
                    if (!done) {
                        read();
                    } else {
                        let offset = 0;
                        bufferArray.forEach((x) => {
                            mergedArray.set(x, offset);
                            offset += x.length;
                        });
                        send += mergedArray.length;
                        processBuffer && (await processBuffer(mergedArray, icyHeaders));
                        onDone({ recieved, send });
                    }
                    return;
                }

                if (icyHeaderLengh > 0) {
                    icyHeaders = String.fromCharCode.apply(
                        null,
                        mergedArray.slice(metaInt + 1, metaInt + 1 + icyHeaderLengh * 16),
                    );
                }
                send += mergedArray.slice(0, metaInt).length;
                processBuffer && (await processBuffer(mergedArray.slice(0, metaInt), icyHeaders));

                let newArray = mergedArray.slice(metaInt + 1 + icyHeaderLengh * 16);
                bufferArray = newArray.length > 0 ? [newArray] : [];
                length = newArray.length ?? 0;

                // If lasted buffer contains metas
                while (length > metaInt) {
                    const headerSize = newArray[metaInt] * 16;
                    if (headerSize + metaInt + 1 > length) {
                        break;
                    }
                    if (headerSize > 0) {
                        icyHeaders = String.fromCharCode.apply(
                            null,
                            newArray.slice(metaInt + 1, metaInt + 1 + headerSize),
                        );
                    }
                    send += newArray.slice(0, metaInt).length;
                    processBuffer && (await processBuffer(newArray.slice(0, metaInt), icyHeaders));
                    newArray = newArray.slice(metaInt + 1 + headerSize);
                    bufferArray = newArray.length > 0 ? [newArray] : [];
                    length = newArray.length;
                }

                if (!done) {
                    read();
                } else {
                    send += newArray.slice(0, metaInt).length;
                    newArray.length > 0 &&
                        processBuffer &&
                        (await processBuffer(newArray.slice(0, metaInt), icyHeaders));
                    onDone({ recieved, send });
                }
            } catch (ex) {
                if (!done) {
                    read();
                } else {
                    onDone({ recieved, send });
                }
            }
        });
    };
    read();
    return response.headers;
}
