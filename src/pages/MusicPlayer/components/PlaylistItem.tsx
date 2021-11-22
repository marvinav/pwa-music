import React from 'react';
import { useMemo } from 'react';
import { Track } from '../../../services/AudioPlayer/types';
import { convertDurationToHumanRead } from '../helpers/convertDurationToHumanRead';

export const PlaylistItem: React.VFC<{ track: Track }> = (props) => {
    const { track } = props;

    const duration = useMemo(() => {
        return convertDurationToHumanRead(track?.duration);
    }, [track.duration]);

    return (
        <section
            className="playlist-item"
            onDoubleClick={(_ev) => {
                // TODO: play this track
            }}
        >
            <span className="title">{track.mediaMetadata?.title ?? track.path}</span>
            <span className="artist">{track.mediaMetadata?.artist}</span>
            <span className="duration">{duration}</span>
        </section>
    );
};

PlaylistItem.propTypes = {
    track: (props, _propName, componentName) => {
        if (!props[_propName]?.['path']) {
            return new Error(
                'Invalid prop `' + 'path' + '` supplied to' + ' `' + componentName + '`. Validation failed.',
            );
        }
    },
};
