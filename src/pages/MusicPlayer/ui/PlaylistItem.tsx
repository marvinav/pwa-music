import PropTypes from 'prop-types';
import React from 'react';
import { useMemo } from 'react';

import { Track } from 'shared/audio/types';

import { convertDurationToHumanRead } from '../lib/convertDurationToHumanRead';

import { artist, title, duration as durationClassName, playlistItem } from './index.css';

export const PlaylistItem: React.VFC<{ track: Track; selected: boolean; onDoubleClick: () => void }> = (properties) => {
    const { track, selected } = properties;

    const duration = useMemo(() => {
        return convertDurationToHumanRead(track?.duration);
    }, [track.duration]);

    return (
        <section
            className={playlistItem({ selected })}
            onDoubleClick={(_event) => {
                properties.onDoubleClick();
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
    track: (properties, _propertyName, componentName) => {
        if (!properties[_propertyName]?.['path']) {
            return new Error(
                'Invalid prop `' + 'path' + '` supplied to' + ' `' + componentName + '`. Validation failed.',
            );
        }
    },
};
