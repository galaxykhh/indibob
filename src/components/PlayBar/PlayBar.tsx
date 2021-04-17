import React, { useState }　from 'react';
import styled from 'styled-components';
import ListBar from './ListBar';
import { observer } from 'mobx-react';
import musicStore from '../../stores/musicStore';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { rotate, reRotate } from '../style/Slide';


const PlayBar: React.FC = observer(() => {
    const [handletab, setHandletab] = useState<boolean>(musicStore.isTabOpen);
    const [display, setDisplay] = useState<string>('none');

    const toggleList = () => {
        setHandletab(!handletab);
    }

    const handleListBar = () => {
        if (display === 'none') {
            setDisplay('block');
            toggleList();
        } else {
            toggleList();
        };
    };

    return (
        <>
            <Container>
                <CurrentPlay>
                    <ImgDiv>
                        <Img url={musicStore.currentMusic.image} />
                    </ImgDiv>
                    <TABox>
                        <STitle> {musicStore.currentMusic.songTitle} </STitle>
                        <Artist> {musicStore.currentMusic.artist} </Artist>
                    </TABox>
                </CurrentPlay>
                <MusicController>
                    <div style={{color: 'white'}}> rand </div>
                    <div style={{color: 'white'}}> prev </div>
                    <div style={{color: 'white'}}> play </div>
                    <div style={{color: 'white'}}> next </div>
                    <div style={{color: 'white'}}> loop </div>
                </MusicController>
                <TabHandlerBox >
                    <TabHandler animation={handletab} onClick={handleListBar}>
                        〈〈
                    </TabHandler>
                </TabHandlerBox>
            </Container>
            <ListBar handletab={handletab} display={display} />
        </>
    )
});

export default PlayBar;

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
    height: 10%;
    z-index: 3;
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

const TabHandlerBox = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 300px;
    height: 100px;
`;

const TabHandler = styled.button<{animation: boolean}>`
    all: unset;
    font-size: 30px;
    color: white;
    cursor: pointer;
    margin-right: 50px;
    animation: ${props => props.animation ? rotate : reRotate } 0.4s ease forwards;
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
`;