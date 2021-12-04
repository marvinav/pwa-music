import React from 'react';

import { Player } from '@/shared/player';

import { visualization, visualNode } from './index.css';

const d = Array.from({ length: 24 }).fill('1');

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

    for (let index = 0; index < data.length; index = index + d.length) {
        let result = 0;
        let added = 0;
        for (const [ind] of d.entries()) {
            if (index + ind < data.length) {
                result = result + data[index + ind];
                added++;
            }
        }
        bars.push(result / added);
    }

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
