import styled from 'styled-components';
import ListBar from './ListBar';
import { observer } from 'mobx-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import musicStore from '../../stores/musicStore';
import { NavLink } from 'react-router-dom';
import { useHandleTab } from '../../Hooks/useHandleTab';
import { useAudio } from '../../Hooks/useAudio';
import { faAngleDoubleLeft, faPlay,faPause, faStepBackward, faStepForward, faVolumeUp, faVolumeMute } from '@fortawesome/free-solid-svg-icons';
import { useEffect } from 'react';

const PlayBar: React.FC = observer(() => {
    const audio = useAudio();
    const handler = useHandleTab();
    const playList = musicStore.playList.slice(); // mobx의 플레이리스트 참조
    useEffect(() => {
        audio.handleAutoPlay();
        console.log(playList);
    }, [musicStore.playingTrack]); // eslint-disable-line

    return (
        <>
            <TrackBar ref={audio.totalTime} >
                <TrackProgress ref={audio.currentTime} />
            </TrackBar>
            <Container>
                <CurrentPlay>
                    <ImgDiv>
                        <Img url={playList[audio.index]?.image} />
                    </ImgDiv>
                    <TABox> 
                        <STitle to='/' > {playList[audio.index]?.songTitle} </STitle>
                        <Artist to='/' > {playList[audio.index]?.artist} </Artist>
                    </TABox>
                </CurrentPlay> 
                <TrackController>
                    <ControlBtn icon={faStepBackward} />
                    <ControlBtn icon={!audio.isPlay ? faPlay : faPause} onClick={audio.handlePlayPause} />
                    <ControlBtn icon={faStepForward} />
                </TrackController>
                <VolumeControllerBox>
                    <VolumeIcon icon={!audio.isMute ? faVolumeUp : faVolumeMute} onClick={audio.handleMute} />
                </VolumeControllerBox>
                <TabHandlerBox >
                    <Wrap rotate={handler.handleTab} >
                        <TabHandler icon={faAngleDoubleLeft} onClick={handler.handleListBar} />
                    </Wrap>
                </TabHandlerBox>
            </Container>
            <ListBar handletab={handler.handleTab} display={handler.display} />
            <Audio src={playList[audio.index]?.src}
                       ref={audio.audio}
                       crossOrigin='anonymous'
                       autoPlay
                       onEnded={() => console.log('end')}
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
    &:hover {
        height: 15px;
    }
`;

const TrackProgress = styled.div`
    position: absolute;
    width: 44.4%;
    height: 100%;
    background-color: rgb(192, 56, 56);
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
    width: 450px;
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

const VolumeControllerBox = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 150px;
    height: 100px;
`;

const VolumeIcon = styled(FontAwesomeIcon)`
    color: white;
    font-size: 23px;
    cursor: pointer;
`;

const TabHandlerBox = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 150px;
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

// const Bob = styled.div`
//     font-size: 13px;
//     margin-left: 10px;
//     color: white;
// `;

// const BobBtn = styled(FontAwesomeIcon)<{isbob: boolean}>`
//     font-size: 25px;
//     color: ${props => (props.isbob ? 'white' : 'red')};
//     cursor: pointer;
//     margin-left: 20px;
// `;

const Audio = styled.audio`
`;