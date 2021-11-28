import React from 'react';
import PropTypes from 'prop-types';
import { useMemo } from 'react';
import { Track } from 'entities/audio/types';
import { convertDurationToHumanRead } from '../lib/convertDurationToHumanRead';
import { artist, title, duration as durationClassName, playlistItem } from './index.css';

export const PlaylistItem: React.VFC<{ track: Track; selected: boolean; onDoubleClick: () => void }> = (props) => {
    const { track, selected } = props;

    const duration = useMemo(() => {
        return convertDurationToHumanRead(track?.duration);
    }, [track.duration]);

    return (
        <section
            className={playlistItem({ selected })}
            onDoubleClick={(_ev) => {
                props.onDoubleClick();
            }}
        >
            <span className={title}>{track.mediaMetadata?.title ?? track.path}</span>
            <span className={artist}>{track.mediaMetadata?.artist}</span>
            <span className={durationClassName}>{duration}</span>
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
