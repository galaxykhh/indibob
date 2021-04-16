import React　from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react';
import musicStore from '../../stores/musicStore';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from '@fortawesome/free-solid-svg-icons';
// import { PcrossDown, PcrossUp } from '../style/Slide';
import { useBob } from '../useBob';


const PlayBar: React.FC = () => {
    const handleBob = useBob();
    // const [currentBob, setCurrentBob] = useState<number>();

    return (
        <>
            <Container>
                <CurrentPlay>
                    <ImgDiv>
                        <Img url={musicStore.currentMusic.image} />
                    </ImgDiv>
                    <Box>
                        <STitle> {musicStore.currentMusic.songTitle.slice()} </STitle>
                        <Artist> {musicStore.currentMusic.artist} </Artist>
                    </Box>
                    <BobBtn onClick={handleBob.PBob} icon={faHeart} isbob={handleBob.bob} />
                </CurrentPlay>
                <MusicController>
                    <div style={{color: 'white'}}> rand </div>
                    <div style={{color: 'white'}}> prev </div>
                    <div style={{color: 'white'}}> play </div>
                    <div style={{color: 'white'}}> next </div>
                    <div style={{color: 'white'}}> loop </div>
                </MusicController>
                <ListController> list </ListController>
            </Container>
        </>
    )
}

const PlayBarObserver = observer(PlayBar);

export default PlayBarObserver;

const Container = styled.div`
    position: fixed;
    left: 0;
    bottom: 0;
    display: flex;
    flex: 1;
    flex-direction: row;
    justify-content: space-between;
    align-content: center;
    align-items: center;
    width: 100%;
    height: 110px;
    background-color: rgba(0, 0, 0, 0.8);
`;

const CurrentPlay = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    margin-left: 15px;
    width: 300px;
    height: 110px;
`;

const MusicController = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 500px;
    height: 100px;
`;

const ListController = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    width: 300px;
    height: 100px;
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

const Box = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
`;

const STitle = styled.div`
    margin-bottom: 10px;
    margin-left: 15px;
    font-size: 15px;
    color: white;
    max-width: 150px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const Artist = styled.div`
    font-size: 13px;
    margin-left: 15px;
    color: white;
    max-width: 150px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const Bob = styled.div`
    font-size: 13px;
    margin-left: 10px;
    color: white;
`;

const BobBtn = styled(FontAwesomeIcon)<{isbob: boolean}>`
    font-size: 25px;
    color: ${props => (props.isbob ? 'white' : 'red')};
    cursor: pointer;
    margin-left: 20px;
    transition: 0.2s ease;
`;