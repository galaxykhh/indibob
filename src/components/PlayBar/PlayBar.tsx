import styled from 'styled-components';
import ListBar from './ListBar';
import { observer } from 'mobx-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import musicStore from '../../stores/musicStore';
import { NavLink } from 'react-router-dom';
import { useHandleTab } from '../../Hooks/useHandleTab';
import { usePlayer } from '../../Hooks/usePlayer';
import { faAngleDoubleLeft, faPlay,faPause, faStepBackward, faStepForward, faVolumeUp, faVolumeMute, faHeart } from '@fortawesome/free-solid-svg-icons';
import { useEffect } from 'react';
import { useBob } from '../../Hooks/useBob';
import { toJS } from 'mobx';

const PlayBar: React.FC = observer(() => {
    const bob = useBob();
    const audio = usePlayer();
    const handler = useHandleTab();
    const playList = toJS(musicStore.playList);
    useEffect(() => {
        audio.handleAutoPlay(musicStore.isTrackExist);
    }, [playList]); // eslint-disable-line

    return (
        <>
            <TrackBar ref={audio.totalTime} onClick={audio.handleProgress} > 
                <TrackHandler ref={audio.handler} // MDN의 linear-gradient 참고하여 그라데이션 없이 구분선을 정해주어, 퍼센트값을 넣어준다.
                              bg={`linear-gradient(to right,
                                 rgb(192, 56, 56) ${audio.currentPercent}%,
                                 rgba(192, 56, 56, .25) ${audio.currentPercent}% 100%)`}
                              />
            </TrackBar>

            <Container>
                <CurrentPlay>
                    <ImgDiv>
                        <Img url={playList[musicStore.trackIndex]?.image} />
                    </ImgDiv>
                    <TABox> 
                        <STitle to='/' > {playList[musicStore.trackIndex]?.songTitle} </STitle>
                        <Artist to='/' > {playList[musicStore.trackIndex]?.artist} </Artist>
                    </TABox>
                    {/* <Bob> {musicStore.playList[audio.index]?.bob} </Bob>
                    <BobBtn icon={faHeart} color={bob.bob ? 'white' : 'red'} onClick={bob.PBob} /> */}
                </CurrentPlay> 

                <TrackController>
                    <ControlBtn icon={faStepBackward} onClick={musicStore.handlePrev} />
                    <ControlBtn icon={audio.isPlay ? faPause : faPlay} onClick={() => audio.handlePlayPause(playList ,musicStore.handleIsTrackExist)} />
                    <ControlBtn icon={faStepForward} onClick={musicStore.handleNext} />
                </TrackController>

                <TimeViewerBox>
                        <TimeViewer display={playList.length === 0 ? 'none' : 'block'} >
                            {audio.formatDuration(audio.currentTime)} / {audio.formatDuration(audio.duration)}
                        </TimeViewer>
                </TimeViewerBox>

                <VolumeControllerBox>
                    <VolumeIcon icon={audio.isMute ? faVolumeMute : faVolumeUp} onClick={audio.handleMute} />
                </VolumeControllerBox>

                <TabHandlerBox >
                    <Wrap rotate={handler.handleTab} >
                        <TabHandler icon={faAngleDoubleLeft} onClick={handler.handleListBar} />
                    </Wrap>
                </TabHandlerBox>
            </Container>
            <ListBar handletab={handler.handleTab} display={handler.display} />
            <Audio src={playList[musicStore.trackIndex]?.src}
                       ref={audio.audio}
                       crossOrigin='anonymous'
                       autoPlay
                       onEnded={musicStore.handleNext}
                       onLoadedData={audio.setAudioData}
                       onTimeUpdate={audio.setAudioTime}
                       />
        </>
    )
});

export default PlayBar;

const TrackBar = styled.div`
    position: fixed;
    bottom: 110px;
    width: 100%;
    height: 5px;
    background-color: rgba(192, 56, 56, .4);
    overflow: hidden;
    cursor: pointer;
    transition: .2s ease;
    transition-delay: .6s;
    z-index: 10000;
    &:hover {
        height: 15px;
    }
`;

const TrackHandler = styled.div<{bg: string}>`
    height: 100%;
    background: ${props => props.bg};
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
    width: 500px;
    height: 100px;
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
    width: 100px;
    height: 100px;
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
    justify-content: flex-start;
    align-items: center;
    width: 200px;
    height: 100px;
`;

const VolumeIcon = styled(FontAwesomeIcon)`
    color: white;
    font-size: 23px;
    width: 50px;
    height: 50px;
    cursor: pointer;
`;

const TabHandlerBox = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 100px;
    height: 100px;
`;

const Wrap = styled.div<{rotate: boolean}>`
    transform: ${props => props.rotate ? 'rotate(180deg)' : 'rotate(0deg)'};
    transition: 0.4s ease;
    margin-right: 50px;
`;

const TabHandler = styled(FontAwesomeIcon)`
    all: unset;
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

const Artist = styled(NavLink)`
    text-decoration: none;
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

const Bob = styled.div`
    font-size: 13px;
    margin-left: 10px;
    color: white;
`;

const BobBtn = styled(FontAwesomeIcon)`
    font-size: 25px;
    color: ${props => props.color};
    cursor: pointer;
    margin-left: 20px;
`;

const Audio = styled.audio`
`;