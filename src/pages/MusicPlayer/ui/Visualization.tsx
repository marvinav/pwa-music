import React from 'react';
import { visualization, visualNode } from './index.css';
import { Player } from 'entities/audio';

const d = new Array(24).fill('1');

export const Visualization: React.VFC = () => {
    const [data, setData] = React.useState(new Uint8Array(Player.nodes.analyzer.frequencyBinCount));
    React.useEffect(() => {
        const timeout = setInterval(() => {
            const array = new Uint8Array(Player.nodes.analyzer.frequencyBinCount);
            Player.nodes.analyzer.getByteTimeDomainData(array);
            setData(array);
        }, 500);
        return () => clearInterval(timeout);
    }, []);

    const bars: number[] = [];

    for (let i = 0; i < data.length; i = i + d.length) {
        let result = 0;
        let added = 0;
        d.forEach((x, ind) => {
            if (i + ind < data.length) {
                result = result + data[i + ind];
                added++;
            }
        });
        bars.push(result / added);
    }

    console.log(bars.length);
    return (
        <div className={visualization}>
            {bars.map((x, ind) => {
                return (
                    <div
                        key={ind}
                        style={{
                            height: `${(x / 255) * 100}%`,
                        }}
                        className={visualNode}
                    ></div>
                );
            })}
        </div>
    );
};
