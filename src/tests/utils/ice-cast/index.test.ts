import { icyCast } from '../../../utils/icyCast';
import { sample } from './sample';
import 'regenerator-runtime/runtime';

function base64ToArrayBuffer(base64: string) {
    const binaryString = window.atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
}

function createIcyHeader(header: string) {
    const headerArray = Array.from(header, (x) => x.charCodeAt(0));
    const result = new Uint8Array(Math.ceil(headerArray.length / 16) * 16 + 1);
    result.set([Math.ceil(headerArray.length / 16)], 0);
    result.set(headerArray, 1);
    const nullBytesLength = headerArray.length % 16;
    if (nullBytesLength > 0) {
        result.set(new Array(16 - nullBytesLength).fill(null), headerArray.length + 1);
    }
    return result;
}

it('Convert sample to Uint8Array', () => {
    const testSample = base64ToArrayBuffer(sample);
    expect(testSample.length).toBe(528216);
});

it('Convert song title to Uint8Array', () => {
    const titleFull = '1234567890123456';
    const titleShouldBeFilledHigh = '1234567890123456789';
    const titleShouldBeFilledLow = '1234567';
    expect(createIcyHeader(titleFull).length).toBe(17);
    expect(createIcyHeader(titleFull)[0]).toBe(1);
    expect(createIcyHeader(titleShouldBeFilledHigh).length).toBe(33);
    expect(createIcyHeader(titleShouldBeFilledLow).length).toBe(17);
});

test('Read file bu chunks 0.5', async () => {
    const testSample = base64ToArrayBuffer(sample);
    let position = 0;
    const icyInt = 8000;
    const titles = ['first-title', 'second-title'];
    const firstTitleArray = createIcyHeader(titles[0]);
    const firstTitleName = String.fromCharCode.apply(null, firstTitleArray.slice(1));
    const secondTitleArray = createIcyHeader(titles[1]);
    const secondTitleName = String.fromCharCode.apply(null, secondTitleArray.slice(1));
    const secondTitleStart = testSample.length / 2;

    const totalIcesHeaders = Math.floor(testSample.length / icyInt);
    const totalIcesHeadersLength = firstTitleArray.length + secondTitleArray.length + totalIcesHeaders - 2;

    const icyBuffer = new Uint8Array(totalIcesHeadersLength + testSample.length);
    const insertedHeaders: Uint8Array[] = [];

    let offset = 0;

    for (let i = 0; i < totalIcesHeaders; i++) {
        const header = i * icyInt > secondTitleStart ? secondTitleArray : firstTitleArray;
        const alreadyInser = insertedHeaders.find((x) => x === header);
        const headerToInsert = alreadyInser ? [0] : header;
        if (!alreadyInser) {
            insertedHeaders.push(header);
        }
        icyBuffer.set(testSample.slice(icyInt * i, icyInt * (i + 1)), offset);
        offset += icyInt;
        icyBuffer.set(headerToInsert, offset);
        offset += headerToInsert.length;
    }
    icyBuffer.set(testSample.slice(icyInt * totalIcesHeaders), offset);

    expect(icyBuffer[1]).toBe(testSample[1]);
    expect(icyBuffer[7994]).toBe(testSample[7994]);
    expect(icyBuffer[7999]).toBe(testSample[7999]);
    expect(icyBuffer[8000]).toBe(firstTitleArray[0]);
    expect(icyBuffer[8001]).toBe(firstTitleArray[1]);
    expect(icyBuffer[8000 + firstTitleArray.length]).toBe(testSample[8000]);
    expect(icyBuffer[8000 + firstTitleArray.length + 1]).toBe(testSample[8001]);
    expect(icyBuffer[16000 + firstTitleArray.length]).toBe(0);
    expect(icyBuffer[16000 + firstTitleArray.length + 1]).toBe(testSample[16000]);
    expect(icyBuffer[16000 + firstTitleArray.length + 2]).toBe(testSample[16001]);
    expect(icyBuffer[16000 + firstTitleArray.length + 3]).toBe(testSample[16002]);
    expect(icyBuffer[icyBuffer.length - 1]).toBe(testSample[testSample.length - 1]);

    let sendBytesLengh = 0;
    const read = async () => {
        const rndChunkSize = icyInt * 0.5;
        const end = position + rndChunkSize >= icyBuffer.length ? icyBuffer.length : position + rndChunkSize;
        const result = new Uint8Array(end - position);
        result.set(icyBuffer.slice(position, end));
        position += rndChunkSize;
        sendBytesLengh += result.length;
        return {
            value: result,
            done: position >= icyBuffer.length,
        };
    };

    const mockFetch = async (_info: RequestInfo, _init: RequestInit) => {
        const headers = new Headers();
        headers.set('icy-metaint', icyInt.toString());
        return {
            headers,
            body: {
                getReader: () => {
                    return { read };
                },
            },
        } as Response;
    };

    global.fetch = mockFetch;

    let totalLength = 0;
    const recievedBuffer = new Uint8Array(testSample.length);
    const wrap = async () => {
        return new Promise<void>(function (resolve, reject) {
            icyCast(
                'https://localhost',
                null,
                async (b, h) => {
                    if (totalLength > icyInt) {
                        expect(h).toBe(totalLength >= secondTitleStart ? secondTitleName : firstTitleName);
                    }
                    recievedBuffer.set(b, totalLength);
                    totalLength += b.length;
                },
                resolve,
            );
        });
    };

    await wrap();

    expect(sendBytesLengh).toBe(icyBuffer.length);
    expect(totalLength).toBe(testSample.length);
    for (let i = 0; i < recievedBuffer.length; i++) {
        expect(recievedBuffer[i]).toBe(testSample[i]);
    }
});

test('Read file bu chunks 0.1', async () => {
    const testSample = base64ToArrayBuffer(sample);
    let position = 0;
    const icyInt = 8000;
    const titles = ['first-title', 'second-title'];
    const firstTitleArray = createIcyHeader(titles[0]);
    const firstTitleName = String.fromCharCode.apply(null, firstTitleArray.slice(1));
    const secondTitleArray = createIcyHeader(titles[1]);
    const secondTitleName = String.fromCharCode.apply(null, secondTitleArray.slice(1));
    const secondTitleStart = testSample.length / 2;

    const totalIcesHeaders = Math.floor(testSample.length / icyInt);
    const totalIcesHeadersLength = firstTitleArray.length + secondTitleArray.length + totalIcesHeaders - 2;

    const icyBuffer = new Uint8Array(totalIcesHeadersLength + testSample.length);
    const insertedHeaders: Uint8Array[] = [];

    let offset = 0;

    for (let i = 0; i < totalIcesHeaders; i++) {
        const header = i * icyInt > secondTitleStart ? secondTitleArray : firstTitleArray;
        const alreadyInser = insertedHeaders.find((x) => x === header);
        const headerToInsert = alreadyInser ? [0] : header;
        if (!alreadyInser) {
            insertedHeaders.push(header);
        }
        icyBuffer.set(testSample.slice(icyInt * i, icyInt * (i + 1)), offset);
        offset += icyInt;
        icyBuffer.set(headerToInsert, offset);
        offset += headerToInsert.length;
    }
    icyBuffer.set(testSample.slice(icyInt * totalIcesHeaders), offset);

    expect(icyBuffer[1]).toBe(testSample[1]);
    expect(icyBuffer[7994]).toBe(testSample[7994]);
    expect(icyBuffer[7999]).toBe(testSample[7999]);
    expect(icyBuffer[8000]).toBe(firstTitleArray[0]);
    expect(icyBuffer[8001]).toBe(firstTitleArray[1]);
    expect(icyBuffer[8000 + firstTitleArray.length]).toBe(testSample[8000]);
    expect(icyBuffer[8000 + firstTitleArray.length + 1]).toBe(testSample[8001]);
    expect(icyBuffer[16000 + firstTitleArray.length]).toBe(0);
    expect(icyBuffer[16000 + firstTitleArray.length + 1]).toBe(testSample[16000]);
    expect(icyBuffer[16000 + firstTitleArray.length + 2]).toBe(testSample[16001]);
    expect(icyBuffer[16000 + firstTitleArray.length + 3]).toBe(testSample[16002]);
    expect(icyBuffer[icyBuffer.length - 1]).toBe(testSample[testSample.length - 1]);

    let sendBytesLengh = 0;
    const read = async () => {
        const rndChunkSize = icyInt * 0.1;
        const end = position + rndChunkSize >= icyBuffer.length ? icyBuffer.length : position + rndChunkSize;
        const result = new Uint8Array(end - position);
        result.set(icyBuffer.slice(position, end));
        position += rndChunkSize;
        sendBytesLengh += result.length;
        return {
            value: result,
            done: position >= icyBuffer.length,
        };
    };

    const mockFetch = async (_info: RequestInfo, _init: RequestInit) => {
        const headers = new Headers();
        headers.set('icy-metaint', icyInt.toString());
        return {
            headers,
            body: {
                getReader: () => {
                    return { read };
                },
            },
        } as Response;
    };

    global.fetch = mockFetch;

    let totalLength = 0;
    const recievedBuffer = new Uint8Array(testSample.length);
    const wrap = async () => {
        return new Promise<void>(function (resolve, reject) {
            icyCast(
                'https://localhost',
                null,
                async (b, h) => {
                    if (totalLength > icyInt) {
                        expect(h).toBe(totalLength >= secondTitleStart ? secondTitleName : firstTitleName);
                    }
                    recievedBuffer.set(b, totalLength);
                    totalLength += b.length;
                },
                resolve,
            );
        });
    };

    await wrap();

    expect(sendBytesLengh).toBe(icyBuffer.length);
    expect(totalLength).toBe(testSample.length);
    for (let i = 0; i < recievedBuffer.length; i++) {
        expect(recievedBuffer[i]).toBe(testSample[i]);
    }
});

test('Read file bu chunks 1.5', async () => {
    const testSample = base64ToArrayBuffer(sample);
    let position = 0;
    const icyInt = 8000;
    const titles = ['first-title', 'second-title'];
    const firstTitleArray = createIcyHeader(titles[0]);
    const firstTitleName = String.fromCharCode.apply(null, firstTitleArray.slice(1));
    const secondTitleArray = createIcyHeader(titles[1]);
    const secondTitleName = String.fromCharCode.apply(null, secondTitleArray.slice(1));
    const secondTitleStart = testSample.length / 2;

    const totalIcesHeaders = Math.floor(testSample.length / icyInt);
    const totalIcesHeadersLength = firstTitleArray.length + secondTitleArray.length + totalIcesHeaders - 2;

    const icyBuffer = new Uint8Array(totalIcesHeadersLength + testSample.length);
    const insertedHeaders: Uint8Array[] = [];

    let offset = 0;

    for (let i = 0; i < totalIcesHeaders; i++) {
        const header = i * icyInt > secondTitleStart ? secondTitleArray : firstTitleArray;
        const alreadyInser = insertedHeaders.find((x) => x === header);
        const headerToInsert = alreadyInser ? [0] : header;
        if (!alreadyInser) {
            insertedHeaders.push(header);
        }
        icyBuffer.set(testSample.slice(icyInt * i, icyInt * (i + 1)), offset);
        offset += icyInt;
        icyBuffer.set(headerToInsert, offset);
        offset += headerToInsert.length;
    }
    icyBuffer.set(testSample.slice(icyInt * totalIcesHeaders), offset);

    expect(icyBuffer[1]).toBe(testSample[1]);
    expect(icyBuffer[7994]).toBe(testSample[7994]);
    expect(icyBuffer[7999]).toBe(testSample[7999]);
    expect(icyBuffer[8000]).toBe(firstTitleArray[0]);
    expect(icyBuffer[8001]).toBe(firstTitleArray[1]);
    expect(icyBuffer[8000 + firstTitleArray.length]).toBe(testSample[8000]);
    expect(icyBuffer[8000 + firstTitleArray.length + 1]).toBe(testSample[8001]);
    expect(icyBuffer[16000 + firstTitleArray.length]).toBe(0);
    expect(icyBuffer[16000 + firstTitleArray.length + 1]).toBe(testSample[16000]);
    expect(icyBuffer[16000 + firstTitleArray.length + 2]).toBe(testSample[16001]);
    expect(icyBuffer[16000 + firstTitleArray.length + 3]).toBe(testSample[16002]);
    expect(icyBuffer[icyBuffer.length - 1]).toBe(testSample[testSample.length - 1]);

    let sendBytesLengh = 0;
    const read = async () => {
        const rndChunkSize = icyInt * 1.5;
        const end = position + rndChunkSize >= icyBuffer.length ? icyBuffer.length : position + rndChunkSize;
        const result = new Uint8Array(end - position);
        result.set(icyBuffer.slice(position, end));
        position += rndChunkSize;
        sendBytesLengh += result.length;
        return {
            value: result,
            done: position >= icyBuffer.length,
        };
    };

    const mockFetch = async (_info: RequestInfo, _init: RequestInit) => {
        const headers = new Headers();
        headers.set('icy-metaint', icyInt.toString());
        return {
            headers,
            body: {
                getReader: () => {
                    return { read };
                },
            },
        } as Response;
    };

    global.fetch = mockFetch;

    let totalLength = 0;
    const recievedBuffer = new Uint8Array(testSample.length);
    const wrap = async () => {
        return new Promise<void>(function (resolve, reject) {
            icyCast(
                'https://localhost',
                null,
                async (b, h) => {
                    if (totalLength > icyInt) {
                        expect(h).toBe(totalLength >= secondTitleStart ? secondTitleName : firstTitleName);
                    }
                    recievedBuffer.set(b, totalLength);
                    totalLength += b.length;
                },
                resolve,
            );
        });
    };

    await wrap();

    expect(sendBytesLengh).toBe(icyBuffer.length);
    expect(totalLength).toBe(testSample.length);
    for (let i = 0; i < recievedBuffer.length; i++) {
        expect(recievedBuffer[i]).toBe(testSample[i]);
    }
});
