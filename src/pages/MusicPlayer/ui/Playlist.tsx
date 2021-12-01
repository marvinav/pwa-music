import React from 'react';

import { ITrack } from 'shared/audio-player/types';

import { PlaylistItem } from './PlaylistItem';
import { playlist } from './index.css';

export const Playlist: React.VFC<{
    tracks?: ITrack[];
    setSelectedTrack: React.Dispatch<React.SetStateAction<ITrack>>;
    selectedTrack?: ITrack;
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
