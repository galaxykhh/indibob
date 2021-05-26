import React from 'react';
import styled from 'styled-components';
import { faPause, faPlay, faRandom, faStepBackward, faStepForward, faSync } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { observer } from 'mobx-react';

interface ITrackController {
    isRandom: boolean;
    isLoop: boolean;
    trackAvailable: boolean;
    toggleIsRandom: () => void;
    toggleIsLoop: () => void;
    replay: () => void;
    playPrev: (isRandom: boolean) => void;
    playNext: (isRandom: boolean) => void;
    handlePlayPause: () => void;
};

const TrackController: React.FC<ITrackController>= observer(({ isRandom, isLoop, trackAvailable, toggleIsRandom, toggleIsLoop, replay, playNext, playPrev, handlePlayPause }) => {
    return (
        <Container>
            <ControlBtn
                icon={faRandom}
                style={{ color: isRandom ? 'white' : 'grey' }}
                onClick={toggleIsRandom}
            />
            <ControlBtn
                icon={faStepBackward}
                onClick={isLoop ? replay : () => playPrev(isRandom)}
            />
            <ControlBtn
                icon={trackAvailable ? faPause : faPlay}
                onClick={handlePlayPause}
            />
            <ControlBtn
                icon={faStepForward}
                onClick={isLoop ? replay : () => playNext(isRandom)}
            />
            <ControlBtn
                icon={faSync}
                style={{ color: isLoop ? 'white' : 'grey' }}
                onClick={toggleIsLoop}
            />
        </Container>
    );
});

export default TrackController;

const Container = styled.div`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    width: 30%;
    height: 100px;
    @media only screen and (max-width: 850px) {
        justify-content: center;
        position: fixed;
        left: 0;
        bottom: 110px;
        width: 100%;
        height: 55px;
        background-color: rgba(0, 0, 0, 0.8);
    }
`;

const ControlBtn = styled(FontAwesomeIcon)`
    color: white;
    font-size: 30px;
    cursor: pointer;
    margin-left: -50px;
    margin-right: -50px;
    transition: all .5s ease;
`;

