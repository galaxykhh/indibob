import React, { useState, useRef, useEffect } from 'react'
import styled from 'styled-components';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';
import moment from 'moment';
import 'moment-duration-format';
import musicStore from '../../stores/musicStore';
import authStore from '../../stores/authStore';
import Modal from '../Modal/Modal';
import PlayList from './PlayList/PlayList';
import CurrentPlaying from './CurrentPlaying/CurrentPlaying';
import ProgressBar from './ProgressBar/ProgressBar';
import TrackController from './TrackController/TrackController';
import VolumeController from './VolumeController/VolumeController';
import TabHandler from './TabHandler/TanHandler';
import TimeViewer from './TimeViewer/TimeViewer';

type DisplayType = 'none' | 'block';

const Controller: React.FC = observer(() => {
    const [handleTab, setHandleTab] = useState<boolean>(false);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [display, setDisplay] = useState<DisplayType>('none');
    const audio = useRef<HTMLAudioElement>(null);
    const totalProgress = useRef<HTMLDivElement>(null); 
    const progressHandler = useRef<HTMLDivElement>(null);
    const totalVolume = useRef<HTMLDivElement>(null);
    const isFirstRun = useRef<boolean>(true);
    const [isRandom, setIsRandom] = useState<boolean>(false);
    const [isLoop, setIsLoop] = useState<boolean>(false);
    const [isMute, setIsMute] = useState<boolean>(false);
    const currentProgressPercent = (musicStore.currentTime! / musicStore.duration!) * 100;
    const currentVolumePercent = (musicStore.volume!) * 100;
    const playList = toJS(musicStore.playList);
    
    const formatDuration = (time: number | undefined) => {
        return moment.duration(time, 'seconds').format('mm:ss', { trim: false });
    };
    const getCurrentTime = (): string => {
        return formatDuration(musicStore.currentTime);
    };

    const getDuration = (): string => {
        return formatDuration(musicStore.duration);
    };

    const playBack = (): Promise<void> | undefined => {
        return audio.current?.play();
    };

    const toggleIsRandom = (): void => {
        if (isLoop) {
            setIsLoop(!isLoop);
            setIsRandom(!isRandom);
        } else {
            setIsRandom(!isRandom);
        };
    };
    
    const toggleIsLoop = (): void => {
        if (isRandom) {
            setIsRandom(!isRandom);
            setIsLoop(!isLoop);
        } else {
            setIsLoop(!isLoop);
        };
    };

    const loopPlay = (): void => {
        audio.current!.currentTime = 0;
    };
    
    const showModal = (): void => {
        if (!musicStore.trackAvailable) {
            return;
        };
        if (authStore.user === null) {
            setTimeout(() => setIsOpen(false), 1500);
            setIsOpen(true);
        };
    };

    const handleListBar = (): void => {
        if (display === 'none') {
            setDisplay('block');
            setHandleTab(!handleTab);
        } else {
            setHandleTab(!handleTab);
        };
    };

    const timeValidator = (): void => {
        const isNextExist = musicStore.timeValidator(audio.current?.currentTime);
        if (isNextExist === false && isLoop) { // not signin / no next track / isLoop
            loopPlay();
            return;
        };
        if (isNextExist === false && !isLoop) { // not signin / no next track / !isLoop
            musicStore.setTrackAvailable(false);
            audio.current?.pause();
            return;
        }
        if (isNextExist === true && !isLoop) { // not signIn / next track exist
            musicStore.playNext(isRandom);
            return;
        };
        if (isNextExist === true && isLoop) {
            loopPlay();
        };
    };

    const handleAudioState = (): void => {
        const result = musicStore.handlePlayPause(audio.current?.currentTime);
        if (result) {
            audio.current?.play();
        } else if (!result) {
            audio.current?.pause();
        };
    };
    
    const handleAutoPlay = (): void => {
        if (isFirstRun.current) {
            isFirstRun.current = false;
            return;
        };
        if (!musicStore.trackAvailable) {
            audio.current?.pause();
        } else {
            playBack()?.then(() => {
            })
            .catch(error => {
            });
        };
    };
    
    const handleMute = (): void => { 
        const savedVolume = audio.current?.volume; // ???????????? ???????????? ??????
        if (isMute && audio.current) {
            setIsMute(!isMute);
            musicStore.setVolume(savedVolume);
            audio.current.muted = false;
        } else if (!isMute && audio.current) {
            setIsMute(!isMute);
            musicStore.setVolume(0);
            audio.current.muted = true;
        };
    };
    
    const handleProgress = (e: React.MouseEvent): void => {
        if (totalProgress.current && audio.current){
            const totalWidth = totalProgress.current.offsetWidth;
            const clickPosition = e.pageX;
            if (authStore.user === null) {
                audio.current.currentTime = (clickPosition! / totalWidth) * 60;
            } else {
                audio.current.currentTime = (clickPosition! / totalWidth) * audio.current.duration;
            };
        };
    };
    
    const handleVolume = (e: React.MouseEvent): void => {
        if (totalVolume.current && audio.current) { // Progress??? ?????? ?????? ????????? ??????????????? ????????? ??????????????? left ???????????? ??????????????????. ????????????
            const clickedPosition = e.pageX;
            const ClientRectLeft = totalVolume.current.getBoundingClientRect().left;
            const progressWidth = totalVolume.current.offsetWidth
            const clickedPositionInBar = clickedPosition - ClientRectLeft;
            const volume = (clickedPositionInBar / progressWidth);
            audio.current.volume = volume;
            musicStore.setVolume(volume);
        };
    };

    useEffect(() => {
        handleAutoPlay();
    }, [playList]); // eslint-disable-line

    useEffect(() => {
        showModal();
    }, [musicStore.trackIndex]); // eslint-disable-line

    useEffect(() => { // ????????? ????????? ?????? ??????????????? ?????? ??????
        musicStore.setDuration(audio.current?.duration);
    }, [authStore.user]); // eslint-disable-line

    return (
        <>  
            <Modal isOpen={isOpen}>
                ????????? ????????? ?????? 1??? ??????????????? ???????????????.
            </Modal>

            <ProgressBar
                totalProgress={totalProgress}
                progressHandler={progressHandler}
                handleProgress={handleProgress}
                currentProgressPercent={currentProgressPercent}
            />

            <Container>
                <CurrentPlaying
                    playList={playList}
                    currentIndex={musicStore.trackIndex}
                />
                <TrackController
                    isRandom={isRandom}
                    isLoop={isLoop}
                    trackAvailable={musicStore.trackAvailable}
                    toggleIsRandom={toggleIsRandom}
                    toggleIsLoop={toggleIsLoop}
                    replay={loopPlay}
                    playPrev={() => musicStore.playPrev(isRandom)}
                    playNext={() => musicStore.playNext(isRandom)}
                    handlePlayPause={handleAudioState}
                />

                <TimeViewer
                    playList={playList}
                    currentTime={getCurrentTime()}
                    duration={getDuration()}
                />

                <VolumeController
                    isMute={isMute}
                    handleMute={handleMute}
                    totalVolume={totalVolume}
                    handleVolume={handleVolume}
                    currentVolumePercent={currentVolumePercent}
                />
                
                <TabHandler
                    handleTab={handleTab}
                    handleListBar={handleListBar}
                />
            </Container>

            <PlayList
                handleTab={handleTab}
                display={display}
                playList={playList}
                trackIndex={musicStore.trackIndex}
                trackAvailable={musicStore.trackAvailable}
            />

            <Audio src={playList[musicStore.trackIndex]?.src}
                ref={audio}
                crossOrigin='anonymous'
                preload='none'
                onEnded={isLoop ? loopPlay : () => musicStore.playNext(isRandom)}
                onLoadedData={() => musicStore.setDuration(audio.current?.duration)}
                onTimeUpdate={timeValidator}
                onCanPlay={() => musicStore.setVolume(audio.current?.volume)}
            />
        </>
    )
});

export default Controller;

const Container = styled.div`
    position: fixed;
    left: 0;
    bottom: 0;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-content: center;
    align-items: center;
    width: 100%;
    height: 110px;
    z-index: 3;
    background-color: rgba(0, 0, 0, 0.8);
`;

const Audio = styled.audio`
`;