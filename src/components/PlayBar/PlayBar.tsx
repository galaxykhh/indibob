import React, { useState, useRef } from 'react'
import styled from 'styled-components';
import { observer } from 'mobx-react';
import { faAngleDoubleLeft, faPlay,faPause, faStepBackward, faStepForward, faVolumeUp, faVolumeMute, faSync, faRandom } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';
import 'moment-duration-format';
import ListBar from './ListBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import musicStore from '../../stores/musicStore';
import { NavLink } from 'react-router-dom';
import { useEffect } from 'react';
import { toJS } from 'mobx';
import { MusicData } from '../../stores/musicStore';
import Modal from '../Modal/Modal';
import authStore from '../../stores/authStore';

type DisplayType = 'none' | 'block';

const PlayBar: React.FC = observer(() => {
    const [handleTab, setHandleTab] = useState<boolean>(false);
    const [display, setDisplay] = useState<DisplayType>('none');
    const playList = toJS(musicStore.playList);
    const audio = useRef<HTMLAudioElement>(null);
    const totalProgress = useRef<HTMLDivElement>(null); 
    const progressHandler = useRef<HTMLDivElement>(null);
    const totalVolume = useRef<HTMLDivElement>(null);
    const isFirstRun = useRef<boolean>(true);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isRandom, setIsRandom] = useState<boolean>(false);
    const [isLoop, setIsLoop] = useState<boolean>(false);
    const [isPlay, setIsPlay] = useState<boolean>(false);
    const [isMute, setIsMute] = useState<boolean>(false);
    const [duration, setDuration] = useState<number>();
    const [currentTime, setCurrentTime] = useState<number>();
    const [volume, setVolume] = useState<number>();
    const currentProgressPercent = (currentTime! / duration!) * 100;
    const currentVolumePercent = (volume!) * 100;
    
    const formatDuration = (duration: number | undefined) => {
        return moment.duration(duration, 'seconds').format('mm:ss', { trim: false });
    };
    
    const setAudioData = (): void => {
        if (authStore.user === null) {
            setDuration(60);
        } else {
            setDuration(audio.current?.duration);
            setCurrentTime(audio.current?.currentTime);
        };
    };
    
    const setAudioTime = (playNext: () => void, playList: MusicData[]): void => {
        if (authStore.user === null && audio.current!.currentTime >= 60 && playList.length === 1) {
            handleLoopPlay();
            return;
        };
        if ((authStore.user === null && audio.current!.currentTime >= 60)) {
            playNext();
        } else {
            setCurrentTime(audio.current?.currentTime);
        };
    };
    
    const setVolumeData = (): void => {
        setVolume(audio.current?.volume);
    };
    
    const playBack = (): Promise<void> | undefined => {
        return audio.current?.play();
    };
    
    const showModal = (trackAvailable: boolean): void => {
        if (trackAvailable === false) {
            return;
        };
        if (authStore.user === null) {
            setTimeout(() => setIsOpen(false), 1500);
            setIsOpen(true);
        };
    };
    
    const handleAutoPlay = (trackAvailable: boolean): void => {
        if (isFirstRun.current) {
            isFirstRun.current = false;
            return;
        };
        if (trackAvailable === false) { // 곡을 추가하는 동시에 trackAvailable가 활성화 (musicStore.handleCurrentTrack => handleTrackAvailable)
            audio.current?.pause();
        } else {
            setIsPlay(true); // 가 반환하는 promise => 재생이 가능한 수준까지 로딩이 되면 트랙을 재생
            playBack()?.then(() => {
            })
            .catch(error => {
            });
        };
    };
    
    const handlePlayPause = (playList: MusicData[], progressHandler: () => void): void => { // progressHandler = musicStore.handleTrackAvailable
        if (playList.length === 0) {
            return
        } else if (isPlay) {
            progressHandler(); 
            setIsPlay(!isPlay);
            audio.current?.pause();
        } else {
            progressHandler();
            setIsPlay(!isPlay);
            audio.current?.play();
        };
    };
    
    const handleMute = (): void => { 
        const savedVolume = audio.current?.volume; // 사용자가 지정했던 볼륨
        if (isMute && audio.current) {
            setIsMute(!isMute);
            setVolume(savedVolume);
            audio.current.muted = false;
        } else if (!isMute && audio.current) {
            setIsMute(!isMute);
            setVolume(0);
            audio.current.muted = true;
        };
    };
    
    const handleRandom = (): void => {
        setIsRandom(!isRandom);
    };
    
    const handleLoop = (): void => {
        setIsLoop(!isLoop);
    };
    
    const handleProgress = (e: React.MouseEvent): void => {
        if (duration && totalProgress.current && audio.current){
            let totalWidth = totalProgress.current.offsetWidth;
            let clickPosition = e?.pageX;
            if (authStore.user === null) {
                audio.current.currentTime = (clickPosition! / totalWidth) * 60;
            } else {
                audio.current.currentTime = (clickPosition! / totalWidth) * audio.current.duration;
            }
        } else {
            return;
        };
    };
    
    const handleVolume = (e: React.MouseEvent): void => {
        if (totalVolume.current && audio.current) { // Progress와 달리 화면 중간에 위치해있기 때문에 클릭지점을 left 거리만큼 계산해야된다. 구글참고
            const clickedPositionInPage = e.pageX;
            const progressStart = totalVolume.current.getBoundingClientRect().left;
            const progressWidth = totalVolume.current.offsetWidth
            const clickedPositionInBar = clickedPositionInPage - progressStart;
            const volume = (clickedPositionInBar / progressWidth);
            audio.current.volume = volume;
            setVolume(volume);
        };
    };
    
    const handleLoopPlay = (): void => {
        audio.current!.currentTime = 0;
    };

    const toggleList = (): void => {
        setHandleTab(!handleTab);
    };

    const handleListBar = (): void => {
        if (display === 'none') {
            setDisplay('block');
            toggleList();
        } else {
            toggleList();
        };
    };

    useEffect(() => {
        handleAutoPlay(musicStore.trackAvailable);
    }, [playList]); // eslint-disable-line

    useEffect(() => {
        showModal(musicStore.trackAvailable);
    }, [musicStore.trackIndex]); // eslint-disable-line

    useEffect(() => { // 로그인 상태에 따른 재생가능한 시간 변경
        setAudioData();
    }, [authStore.user]) // eslint-disable-line

    return (
        <>  
            <Modal isopen={isOpen}>
                로그인 정보가 없어 1분 미리듣기만 가능합니다.
            </Modal>

            <ProgressBar ref={totalProgress}>
                <ProgressHandler ref={progressHandler} // MDN: linear-gradient 그라데이션 없이 구분선을 정해주어, 퍼센트값을 넣어준다.
                    onMouseDown={handleProgress}
                    style={{ 
                        height: '100%',
                        background: `linear-gradient(to right,
                            rgb(192, 56, 56) ${currentProgressPercent}%,
                            rgba(192, 56, 56, .5) ${currentProgressPercent}% 100%)`,
                    }}
                />
            </ProgressBar>

            <Container>

                <CurrentPlay>
                    <ImgDiv>
                        <Img url={playList[musicStore.trackIndex]?.image} />
                    </ImgDiv>

                    <TABox> 
                        <STitle to={`/song/${playList[musicStore.trackIndex]?.id}`}>
                            {playList[musicStore.trackIndex]?.songTitle}
                        </STitle>
                        <Artist> {playList[musicStore.trackIndex]?.artist} </Artist>
                    </TABox>
                </CurrentPlay> 
                
                <TrackController>
                    <ControlBtn icon={faRandom}
                        style={{color: isRandom ? 'white' : 'grey'}}
                        onClick={handleRandom}
                    />
                    <ControlBtn icon={faStepBackward}
                        onClick={() => isLoop ?  handleLoopPlay() : musicStore.handlePrev(isRandom)}
                    />
                    <ControlBtn icon={isPlay ? faPause : faPlay}
                        onClick={() => handlePlayPause(playList ,musicStore.handleTrackAvailable)}
                    />
                    <ControlBtn icon={faStepForward}
                        onClick={() => isLoop ?  handleLoopPlay() : musicStore.handleNext(isRandom)}
                    />
                    <ControlBtn icon={faSync}
                        style={{ color: isLoop ? 'white' : 'grey' }}
                        onClick={handleLoop}
                    />
                </TrackController>
            
                <TimeViewerBox>
                        <TimeViewer display={playList.length === 0 ? 'none' : 'block'} >
                            {formatDuration(currentTime)} / {formatDuration(duration)}
                        </TimeViewer>
                </TimeViewerBox>

                <VolumeControllerBox>
                    <VolumeIconBox>
                        <VolumeIcon icon={isMute ? faVolumeMute : faVolumeUp}
                            onClick={handleMute}
                        />
                    </VolumeIconBox>
                    <VolumeBar ref={totalVolume}
                        onClick={handleVolume}
                    >
                        <VolumeHandler style={{
                                height: '100%',
                                background: `linear-gradient(to right,
                                    rgb(255, 255, 255) ${currentVolumePercent}%,
                                    rgba(255, 255, 255, .5) ${currentVolumePercent}% 100%)`,
                            }}
                        />
                    </VolumeBar>
                </VolumeControllerBox>
                
                <TabHandlerBox >
                    <TablHandlerWrap $rotate={handleTab} >
                        <TabHandler icon={faAngleDoubleLeft}
                                    onClick={handleListBar}
                                    />
                    </TablHandlerWrap>
                </TabHandlerBox>

            </Container>
            
            <ListBar handletab={handleTab}
                display={display}
                reset={() => handlePlayPause(playList ,musicStore.handleTrackAvailable)}
            />
            <Audio src={playList[musicStore.trackIndex]?.src}
                ref={audio}
                crossOrigin='anonymous'
                preload='none'
                onEnded={() => isLoop ? handleLoopPlay() : musicStore.handleNext(isRandom)}
                onLoadedData={setAudioData}
                onTimeUpdate={() => setAudioTime(() => musicStore.handleNext(isRandom), playList)}
                onCanPlay={setVolumeData}
            />
        </>
    )
});

export default PlayBar;

const ProgressBar = styled.div`
    position: fixed;
    bottom: 110px;
    width: 100%;
    height: 6px;
    overflow: hidden;
    cursor: pointer;
    transition: height .2s ease;
    z-index: 10000;
    &:hover {
        height: 15px;
    }
    @media only screen and (max-width: 850px) {
        position: fixed;
        left: 0;
        bottom: 164px;
    }
`;

const ProgressHandler = styled.div`
`;

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

const CurrentPlay = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    margin-left: 15px;
    width: 35%;
    height: 110px;
`;

const TrackController = styled.div`
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

const TimeViewerBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 10%;
    height: 100px;
    @media only screen and (max-width: 630px) {
        justify-content: flex-start;   
    }
`;

const TimeViewer = styled.div<{ display: string }>`
    display: ${({ display }) => display};
    white-space: nowrap;
    font-size: 15px;
    color: #dbd7d7;
`;

const VolumeControllerBox = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 20%;
    height: 100px;
    @media only screen and (max-width: 630px) {
        justify-content: flex-end;
        width: 30px;
    }
`;

const VolumeIconBox = styled.div`
    width: 45px;
    height: 45px;
`;

const VolumeIcon = styled(FontAwesomeIcon)`
    color: white;
    font-size: 23px;
    width: 45px;
    height: 45px;
    cursor: pointer;
`;

const VolumeBar = styled.div`
    width: 90px;
    height: 5px;
    overflow: hidden;
    cursor: pointer;
    transition: .2s ease;
    transition-delay: .6s;
    &:hover {
        height: 10px;
    }
    @media only screen and (max-width: 630px) {
        display: none;
    }
`;

const VolumeHandler = styled.div`
`;

const TabHandlerBox = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 100px;
    height: 100px;
    @media only screen and (max-width: 630px) {
        width: 30px;   
    }
`;

const TablHandlerWrap = styled.div<{ $rotate: boolean }>`
    transform: ${props => props.$rotate ? 'rotate(180deg)' : 'rotate(0deg)'};
    transition: 0.4s ease;
    margin-right: 50px;
`;

const TabHandler = styled(FontAwesomeIcon)`
    all: unset;
    width: 10%;
    font-size: 30px;
    color: white;
    cursor: pointer;
`;

const ImgDiv = styled.div`
    margin-top: 15px;
    margin-bottom: 15px;
    width: 70px;
    height: 70px;
`;

const Img = styled.div<{ url: string }>`
    width: 70px;
    height: 70px;
    background-size: cover;
    background-position: center;
    background-image: url(${({ url }) => url});
`;

const TABox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
`;

const STitle = styled(NavLink)`
    text-decoration: none;
    margin-bottom: 10px;
    margin-left: 15px;
    font-size: 15px;
    color: white;
    max-width: 150px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    &:hover {
        text-decoration: underline;
    }
`;

const Artist = styled.div`
    font-size: 13px;
    margin-left: 15px;
    color: white;
    max-width: 150px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    &:hover {
        text-decoration: underline;
    }
`;

const Audio = styled.audio`
`;