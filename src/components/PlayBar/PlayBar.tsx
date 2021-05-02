import styled from 'styled-components';
import ListBar from './ListBar';
import { observer } from 'mobx-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import musicStore from '../../stores/musicStore';
import { NavLink } from 'react-router-dom';
import { useHandleTab } from '../../Hooks/useHandleTab';
import { usePlayer } from '../../Hooks/usePlayer';
import { faAngleDoubleLeft, faPlay,faPause, faStepBackward, faStepForward, faVolumeUp, faVolumeMute, faSync, faRandom } from '@fortawesome/free-solid-svg-icons';
import { useEffect } from 'react';
// import { useBob } from '../../Hooks/useBob';
import { toJS } from 'mobx';
import Modal from '../Modal/Modal';
import authStore from '../../stores/authStore';

const PlayBar: React.FC = observer(() => {
    // const bob = useBob();
    const audio = usePlayer();
    const progressHandler = useHandleTab();
    const playList = toJS(musicStore.playList);
    useEffect(() => {
        audio.handleAutoPlay(musicStore.trackAvailable);
    }, [playList]); // eslint-disable-line

    useEffect(() => {
        audio.showModal(musicStore.trackAvailable);
    }, [musicStore.trackIndex]); // eslint-disable-line

    useEffect(() => { // 로그인 상태에 따른 재생가능한 시간 변경
        audio.setAudioData();
    }, [authStore.user]) // eslint-disable-line

    return (
        <>  
            <Modal isopen={audio.isOpen}>
                <Ment>
                    로그인 정보가 없어 1분 미리듣기만 가능합니다.
                </Ment>
            </Modal>
            <TrackBar ref={audio.totalProgress}
                      >
                <TrackHandler ref={audio.progressHandler} // MDN: linear-gradient 그라데이션 없이 구분선을 정해주어, 퍼센트값을 넣어준다.
                              onMouseDown={audio.handleProgress}
                              style={{ 
                                height: '100%',
                                background: `linear-gradient(
                                                to right,
                                                rgb(192, 56, 56) ${audio.currentProgressPercent}%,
                                                rgba(192, 56, 56, .5) ${audio.currentProgressPercent}% 100%)`,
                             }}
                               />
            </TrackBar>

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

                    {/* <Bob> {musicStore.playList[audio.index]?.bob} </Bob>
                    <BobBtn icon={faHeart} color={bob.bob ? 'white' : 'red'} onClick={bob.PBob} /> */}
                </CurrentPlay> 

                <TrackController>
                    <ControlBtn icon={faRandom}
                                style={{color: audio.isRandom ? 'white' : 'grey'}}
                                onClick={audio.handleRandom}
                                />
                    <ControlBtn icon={faStepBackward}
                                onClick={() => audio.isLoop ?  audio.handleLoopPlay() : musicStore.handlePrev(audio.isRandom)}
                                />
                    <ControlBtn icon={audio.isPlay ? faPause : faPlay}
                                onClick={() => audio.handlePlayPause(playList ,musicStore.handleTrackAvailable)}
                                />
                    <ControlBtn icon={faStepForward}
                                onClick={() => audio.isLoop ?  audio.handleLoopPlay() : musicStore.handleNext(audio.isRandom)}
                                />
                    <ControlBtn icon={faSync}
                                style={{color: audio.isLoop ? 'white' : 'grey'}}
                                onClick={audio.handleLoop}
                                />
                </TrackController>

                <TimeViewerBox>
                        <TimeViewer display={playList.length === 0 ? 'none' : 'block'} >
                            {audio.formatDuration(audio.currentTime)} / {audio.formatDuration(audio.duration)}
                        </TimeViewer>
                </TimeViewerBox>

                <VolumeControllerBox>
                    <VolumeIconBox>
                        <VolumeIcon icon={audio.isMute ? faVolumeMute : faVolumeUp}
                                    onClick={audio.handleMute}
                                    />
                    </VolumeIconBox>
                    <VolumeBar ref={audio.totalVolume}
                               onClick={audio.handleVolume}
                               >
                        <VolumeHandler ref={audio.volumeHandler}
                                       style={{
                                        height: '100%',
                                        background: `linear-gradient(
                                                        to right,
                                                      rgb(255, 255, 255) ${audio.currentVolumePercent}%,
                                                      rgba(255, 255, 255, .5) ${audio.currentVolumePercent}% 100%)`,
                                       }}
                                       />
                    </VolumeBar>
                </VolumeControllerBox>

                <TabHandlerBox >
                    <TablHandlerWrap rotate={progressHandler.handleTab} >
                        <TabHandler icon={faAngleDoubleLeft}
                                    onClick={progressHandler.handleListBar}
                                    />
                    </TablHandlerWrap>
                </TabHandlerBox>
            </Container>

            <ListBar handletab={progressHandler.handleTab}
                     display={progressHandler.display}
                     reset={() => audio.handlePlayPause(playList ,musicStore.handleTrackAvailable)}
                     />
            <Audio src={playList[musicStore.trackIndex]?.src}
                   ref={audio.audio}
                   crossOrigin='anonymous'
                   preload='none'
                   onEnded={() => audio.isLoop ? audio.handleLoopPlay() : musicStore.handleNext(audio.isRandom)}
                   onLoadedData={audio.setAudioData}
                   onTimeUpdate={() => audio.setAudioTime(() => musicStore.handleNext(audio.isRandom), playList)}
                   onCanPlay={audio.setVolumeData}
                   />
        </>
    )
});

export default PlayBar;

const TrackBar = styled.div`
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

const TrackHandler = styled.div`
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
    width: 30%;
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

const TimeViewer = styled.div<{display: string;}>`
    display: ${props => props.display};
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

const TablHandlerWrap = styled.div<{rotate: boolean}>`
    transform: ${props => props.rotate ? 'rotate(180deg)' : 'rotate(0deg)'};
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

const Img = styled.div<{ url?: string }>`
    width: 70px;
    height: 70px;
    background-size: cover;
    background-position: center;
    background-image: url(${props => props.url});
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

// const Bob = styled.div`
//     font-size: 13px;
//     margin-left: 10px;
//     color: white;
// `;

// const BobBtn = styled(FontAwesomeIcon)`
//     font-size: 25px;
//     color: ${props => props.color};
//     cursor: pointer;
//     margin-left: 20px;
// `;

const Audio = styled.audio`
`;

const Ment = styled.div`
    color: white;
    font-size: 18px;
    text-align: center;
    margin-top: 3px;
`;