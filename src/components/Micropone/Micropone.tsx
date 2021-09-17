import React from 'react';
import useUserMedia from 'react-use-user-media';
import useRecordMp3 from 'use-record-mp3';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBan } from '@fortawesome/free-solid-svg-icons';
import { faCheckCircle } from '@fortawesome/free-regular-svg-icons';

import './index.scss';

const constraints = { audio: true };

export default function Microphone(props: { onAbort: () => void; onFinish: (file: Blob) => void }) {
    const { stream } = useUserMedia(constraints);
    const { startRecording, stopRecording, isRecording, blob } = useRecordMp3(stream, {
        vbrQuality: 4, // 1 (highest) to 9 (lowest)
    });

    React.useEffect(() => {
        if (!isRecording) {
            startRecording();
        }
    }, [startRecording, isRecording]);

    React.useEffect(() => {
        if (blob) {
            props.onFinish(blob);
        }
    }, [blob, props]);

    return (
        <div className="micropone-recorder">
            <FontAwesomeIcon
                style={{ color: 'red', cursor: 'pointer' }}
                icon={faBan}
                onClick={() => {
                    stopRecording();
                    props.onAbort();
                }}
            ></FontAwesomeIcon>
            <Timer key="mic-timer" />
            <FontAwesomeIcon
                style={{ color: 'green', cursor: 'pointer' }}
                icon={faCheckCircle}
                onClick={() => {
                    stopRecording();
                }}
            ></FontAwesomeIcon>
        </div>
    );
}

const Timer = () => {
    const [time, setTime] = React.useState<string>('00:00');

    React.useEffect(() => {
        const date = Date.now();
        const timer = setInterval(() => {
            setTime(() => {
                const passed = new Date(Date.now() - date);
                const atomized = passed.toISOString().split('T')[1].split(':');
                atomized[2][0];
                return `${atomized[1]}:${atomized[2][0]}${atomized[2][1]}`;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    return <div>{time}</div>;
};
