import React from 'react';

import { Track } from 'entities/audio/types';
import { playlist } from '../index.css';
import { PlaylistItem } from './PlaylistItem';

export const Playlist: React.VFC<{
    tracks?: Track[];
    setSelectedTrack: React.Dispatch<React.SetStateAction<Track>>;
    selectedTrack?: Track;
}> = (props) => {
    const ref = React.useRef();

    return (
        <div className={playlist} ref={ref}>
            {props.tracks?.map((x) => {
                return (
                    <PlaylistItem
                        selected={props.selectedTrack && props.selectedTrack === x}
                        onDoubleClick={() => {
                            props.setSelectedTrack(x);
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
