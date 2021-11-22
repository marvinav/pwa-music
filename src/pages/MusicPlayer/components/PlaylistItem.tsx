import React from 'react';
import PropTypes from 'prop-types';
import { useMemo } from 'react';
import { Track } from '../../../services/AudioPlayer/types';
import { convertDurationToHumanRead } from '../helpers/convertDurationToHumanRead';

export const PlaylistItem: React.VFC<{ track: Track; selected: boolean; onDoubleClick: () => void }> = (props) => {
    const { track, selected } = props;

    const className = selected ? 'playlist-item selected' : 'playlist-item';

    const duration = useMemo(() => {
        return convertDurationToHumanRead(track?.duration);
    }, [track.duration]);

    return (
        <section
            className={className}
            onDoubleClick={(_ev) => {
                props.onDoubleClick();
            }}
        >
            <span className="title">{track.mediaMetadata?.title ?? track.path}</span>
            <span className="artist">{track.mediaMetadata?.artist}</span>
            <span className="duration">{duration}</span>
        </section>
    );
};

PlaylistItem.propTypes = {
    onDoubleClick: PropTypes.func,
    track: (props, _propName, componentName) => {
        if (!props[_propName]?.['path']) {
            return new Error(
                'Invalid prop `' + 'path' + '` supplied to' + ' `' + componentName + '`. Validation failed.',
            );
        }
    },
};
