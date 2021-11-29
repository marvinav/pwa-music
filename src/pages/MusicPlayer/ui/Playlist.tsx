import React from 'react';

import { Track } from 'entities/audio/types';

import { PlaylistItem } from './PlaylistItem';
import { playlist } from './index.css';

export const Playlist: React.VFC<{
    tracks?: Track[];
    setSelectedTrack: React.Dispatch<React.SetStateAction<Track>>;
    selectedTrack?: Track;
}> = (properties) => {
    const reference = React.useRef();

    return (
        <div className={playlist} ref={reference}>
            {properties.tracks?.map((x) => {
                return (
                    <PlaylistItem
                        selected={properties.selectedTrack && properties.selectedTrack === x}
                        onDoubleClick={() => {
                            properties.setSelectedTrack(x);
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
