import React from 'react';
import PropTypes from 'prop-types';
import { Window } from '../../layouts/Window';
import { SvgIcon } from '../../components/SvgIcon';
import './index.scss';

// import gear from '../../../static/assets/player/gear-solid.svg?raw';
// import record from '../../../static/assets/player/record-solid.svg?raw';
import next from '../../../static/assets/player/next-solid.svg?raw';
import pause from '../../../static/assets/player/pause-solid.svg?raw';
import play from '../../../static/assets/player/play-solid.svg?raw';
import { Track } from '../../services/AudioPlayer/types';
import { BaseComponentProps } from '../../components/types';

const MusicPlayer: React.VFC = () => {
    return (
        <Window title="player" className="music-player">
            <ControlPanel />
            <Playlist />
        </Window>
    );
};

const SvgControlClasses: BaseComponentProps['classes'] = ['button'];

const ControlPanel: React.VFC = () => {
    return (
        <div className="control-panel">
            <SvgIcon src={next} classes={SvgControlClasses} className="previous" />
            <SvgIcon src={play} classes={SvgControlClasses} className="play" />
            <SvgIcon src={pause} classes={SvgControlClasses} className="pause" />
            <SvgIcon src={next} classes={SvgControlClasses} className="next" />
        </div>
    );
};

const Playlist: React.VFC<{ tracks?: Track[] }> = (props) => {
    return (
        <div className="playlist">
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

const PlaylistItem: React.VFC<{ track: Track }> = (props) => {
    return (
        <section className="playlist item">
            <span>{props.track.path}</span>
        </section>
    );
};

PlaylistItem.propTypes = {
    track: (props, _propName, componentName) => {
        if (!props['path']) {
            return new Error(
                'Invalid prop `' + 'path' + '` supplied to' + ' `' + componentName + '`. Validation failed.',
            );
        }
    },
};

export default MusicPlayer;
