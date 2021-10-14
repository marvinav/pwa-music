export class IcyCastReader {
    readonly info: RequestInfo;
    readonly init: RequestInit;
    private readonly _abortController: AbortController;
    private _response: Response;
    private _bodyReader: ReadableStreamDefaultReader<Uint8Array>;
    private _metaInt: number;
    private _state: 'initialized' | 'started' | 'stopped' = 'initialized';
    private _icyHeader: string = null;
    private bufferArray: Uint8Array[] = [];
    private length = 0;
    private received = 0;
    private send = 0;

    processBuffer: (buff: Uint8Array, icyHeaders: string) => Promise<void>;
    onDone: (params: { received: number; send: number }) => void;

    get state(): typeof this._state {
        return this._state;
    }

    get metaInt(): number {
        return this._metaInt;
    }

    get icyHeader(): string {
        return this._icyHeader;
    }

    constructor(info: RequestInfo, init: RequestInit) {
        this.info = info;
        this._abortController = new AbortController();
        init = init ?? {};
        if (init.signal) {
            const oldSignal = init.signal;
            const oldOnAbort = init.signal.onabort;
            oldSignal.onabort = (ev) => {
                oldOnAbort && oldOnAbort.apply(this, ev);
                this._abortController.abort();
                this._state = 'stopped';
            };
        }
        init.signal = this._abortController.signal;
        init.keepalive = init.keepalive === undefined ? true : init.keepalive;
        init.mode = init.mode ?? 'cors';
        init.headers = init.headers ?? {};
        init.headers['icy-metadata'] = init.headers['icy-metadata'] ?? 1;
        this.init = init;
    }

    private read = async () => {
        const { value, done } = await this._bodyReader.read();
        try {
            // Add new buffer to collected inside one chunk
            if (value && value.length > 0) {
                this.bufferArray.push(value);
                this.length += value.length;
                this.received += value.length;
            }

            const mergedArray = new Uint8Array(this.length);

            // If current buffer does not contain all metadata when skip
            if (this.metaInt && this.length < this.metaInt) {
                if (!done) {
                    this.read();
                } else {
                    let offset = 0;
                    this.bufferArray.forEach((x) => {
                        mergedArray.set(x, offset);
                        offset += x.length;
                    });
                    this.send += mergedArray.length;
                    this.processBuffer && (await this.processBuffer(mergedArray, this.icyHeader));
                    this.done();
                }
                return;
            }

            let offset = 0;
            this.bufferArray.forEach((x) => {
                mergedArray.set(x, offset);
                offset += x.length;
            });

            const icyHeaderLength = mergedArray[this.metaInt] ?? 0;
            // If current buffer does not contain all metadata when skip
            if (this.length < this.metaInt + icyHeaderLength * 16 + 1) {
                if (!done) {
                    this.read();
                } else {
                    let offset = 0;
                    this.bufferArray.forEach((x) => {
                        mergedArray.set(x, offset);
                        offset += x.length;
                    });
                    this.send += mergedArray.length;
                    this.processBuffer && (await this.processBuffer(mergedArray, this.icyHeader));
                    this.done();
                }
                return;
            }

            if (icyHeaderLength > 0) {
                this._icyHeader = String.fromCharCode.apply(
                    null,
                    mergedArray.slice(this.metaInt + 1, this.metaInt + 1 + icyHeaderLength * 16),
                );
            }
            this.send += mergedArray.slice(0, this.metaInt).length;
            this.processBuffer && (await this.processBuffer(mergedArray.slice(0, this.metaInt), this.icyHeader));

            let newArray = mergedArray.slice(this.metaInt + 1 + icyHeaderLength * 16);
            this.bufferArray = newArray.length > 0 ? [newArray] : [];
            this.length = newArray.length ?? 0;

            // If lasted buffer contains meta
            while (this.length > this.metaInt) {
                const headerSize = newArray[this.metaInt] * 16;
                if (headerSize + this.metaInt + 1 > this.length) {
                    break;
                }
                if (headerSize > 0) {
                    this._icyHeader = String.fromCharCode.apply(
                        null,
                        newArray.slice(this.metaInt + 1, this.metaInt + 1 + headerSize),
                    );
                }
                this.send += newArray.slice(0, this.metaInt).length;
                this.processBuffer && (await this.processBuffer(newArray.slice(0, this.metaInt), this.icyHeader));
                newArray = newArray.slice(this.metaInt + 1 + headerSize);
                this.bufferArray = newArray.length > 0 ? [newArray] : [];
                this.length = newArray.length;
            }

            if (!done) {
                this.read();
            } else {
                this.send += newArray.slice(0, this.metaInt).length;
                newArray.length > 0 &&
                    this.processBuffer &&
                    (await this.processBuffer(newArray.slice(0, this.metaInt), this.icyHeader));
                this.done();
            }
        } catch (ex) {
            if (!done) {
                this.read();
            } else {
                this.done();
            }
        }
    };

    private done = () => {
        this.onDone && this.onDone({ received: this.received, send: this.send });
        this._state = 'stopped';
    };

    async start(processBuffer?: IcyCastReader['processBuffer'], onDone?: IcyCastReader['onDone']): Promise<Headers> {
        if (this._state != 'initialized') {
            throw new Error('Cast can`t be started only once');
        }
        this._state = 'started';
        this.processBuffer = processBuffer;
        this.onDone = onDone;
        this._response = await fetch(this.info, this.init);
        this._metaInt = Number.parseInt(this._response.headers.get('icy-metaint'), 10);
        this._bodyReader = this._response.body.getReader();
        this.read();
        return this._response.headers;
    }

    stop = (): void => {
        this._abortController.abort();
        this._state = 'stopped';
    };
}
