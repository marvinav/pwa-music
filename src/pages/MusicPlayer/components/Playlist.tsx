import React from 'react';
import PropTypes from 'prop-types';

import { Track } from '../../../services/AudioPlayer/types';
import { PlaylistItem } from './PlaylistItem';

export const Playlist: React.VFC<{ tracks?: Track[] }> = (props) => {
    const ref = React.useRef();

    return (
        <div className="playlist" ref={ref}>
            {props.tracks?.map((x) => {
                return <PlaylistItem key={x.path} track={x}></PlaylistItem>;
            })}
        </div>
    );
};

Playlist.propTypes = {
    tracks: PropTypes.array,
};

Playlist.defaultProps = {
    tracks: [],
};
