import React from 'react';

import { ITrack } from 'shared/audio-player/types';

import { PlaylistItem } from './PlaylistItem';
import { playlist } from './index.css';

export const Playlist: React.VFC<{
    tracks?: ITrack[];
    onPlayTrack: (track: number) => void;
    playingTrack?: ITrack;
}> = (properties) => {
    const reference = React.useRef();

    return (
        <div className={playlist} ref={reference}>
            {properties.tracks?.map((x, index) => {
                return (
                    <PlaylistItem
                        selected={properties?.playingTrack === x}
                        onDoubleClick={() => {
                            properties.onPlayTrack(index);
                        }}
                        key={`path:${x.path}order:${index}`}
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
