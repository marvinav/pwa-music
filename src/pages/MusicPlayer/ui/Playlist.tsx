import React from 'react';

import { ITrack } from 'shared/audio-player/types';

import { PlaylistItem } from './PlaylistItem';
import { playlist } from './index.css';

export const Playlist: React.VFC<{
    tracks?: ITrack[];
    setSelectedTrack: React.Dispatch<React.SetStateAction<number>>;
    selectedTrack?: { track: ITrack; position: number };
}> = (properties) => {
    const reference = React.useRef();

    return (
        <div className={playlist} ref={reference}>
            {properties.tracks?.map((x, ind) => {
                return (
                    <PlaylistItem
                        selected={properties?.selectedTrack?.position === ind}
                        onDoubleClick={() => {
                            properties.setSelectedTrack(ind);
                        }}
                        key={x.path}
                        track={x}
                    ></PlaylistItem>
                );
            })}
        </div>
    );
};

Playlist.defaultProps = {
    tracks: [],
};
