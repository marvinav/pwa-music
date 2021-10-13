function createPlayer(minBuffSize = 16000 * 4) {
    const context = new AudioContext();
    const gainNode = context.createGain();
    gainNode.connect(context.destination);
    context.suspend();
    let totalDuration = 0;
    let buffs = [];
    let length = 0;
    /**
     * @type Uint8Array
     */
    let prevChunk = new Uint8Array(0);
    /**
     * @type {(buff: Uint8Array) => Promise<void>} buff
     */
    const play = async (buff) => {
        try {
            buffs.push(buff);

            length += buff.length;
            if (length < minBuffSize) {
                return;
            }
            const mergedBuff = new Uint8Array(length + prevChunk.length);
            mergedBuff.set(prevChunk, 0);
            let offset = prevChunk.length;
            buffs.forEach((x) => {
                mergedBuff.set(x, offset);
                offset += x.length;
            });
            const au = await context.decodeAudioData(mergedBuff.buffer);
            const source = context.createBufferSource();
            source.connect(gainNode);
            source.connect(context.destination);
            source.buffer = au;
            const prevChunkDur = prevChunk.length > 0 ? (await context.decodeAudioData(prevChunk.buffer)).duration : 0;
            source.start(totalDuration - prevChunkDur);

            prevChunk = buff;
            // To prevent 'clicks' and 'gaps' between two chunks
            gainNode.gain.setValueAtTime(0, totalDuration - prevChunkDur);
            gainNode.gain.setValueAtTime(1, totalDuration);
            totalDuration += au.duration - prevChunkDur;
        } catch (err) {
            console.log(err);
        }
        buffs = [];
        length = 0;
    };
    return { play };
}

export async function icyCast(
    url: string,
    requestInit: RequestInit = {},
    processBuffer: (buff: Uint8Array, icyHeaders: string) => Promise<void>,
    onDone: () => void,
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
    let state: 'full' | 'not_contain' | 'part' = 'not_contain';

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
                    state = 'not_contain';
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
                        onDone();
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
                    state = 'part';
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
                        onDone();
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

                const newArray = mergedArray.slice(metaInt + 1 + icyHeaderLengh * 16);
                bufferArray = newArray.length > 0 ? [newArray] : [];
                length = newArray.length ?? 0;

                if (!done) {
                    read();
                } else {
                    send += newArray.slice(0, metaInt).length;
                    newArray.length > 0 && processBuffer && (await processBuffer(newArray, icyHeaders));
                    onDone();
                }
            } catch (ex) {
                if (!done) {
                    read();
                } else {
                    onDone();
                }
            }
        });
    };
    read();
    return response.headers;
}
export async function saveByteArray(byte: Uint8Array[]): Promise<void> {
    const blob = new Blob(byte, { type: 'media/mp3' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    const fileName = 'test.mp3';
    link.download = fileName;
    link.click();
}
export function playerWithSave() {
    const player = createPlayer();
    const songs: { [key: string]: { buffs: Uint8Array[] } } = {};

    const play: (buff: Uint8Array, title: string) => Promise<void> = async (buff: Uint8Array, title: string) => {
        player.play(new Uint8Array(buff));
        if (title) {
            const curSong = songs[title];
            if (!curSong) {
                songs[title] = {
                    buffs: [buff],
                };
            } else {
                curSong.buffs.push(buff);
            }
        }
        console.log(title);
    };
    return {
        play,
    };
}
