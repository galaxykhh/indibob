import styled from 'styled-components';
import ListBar from './ListBar';
import { observer } from 'mobx-react';
import musicStore from '../../stores/musicStore';
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from 'react-router-dom';
import { useHandleTab } from '../../Hooks/useHandleTab';

const PlayBar: React.FC = observer(() => {

    const handler = useHandleTab();

    return (
        <>
            <Container>
                <CurrentPlay>
                    <ImgDiv>
                        <Img url={musicStore.currentTrack.image} />
                    </ImgDiv>
                    <TABox>
                        <STitle to='/' > {musicStore.currentTrack.songTitle} </STitle>
                        <Artist to='/' > {musicStore.currentTrack.artist} </Artist>
                    </TABox>
                </CurrentPlay>
                <MusicController>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div style={{color: 'white', letterSpacing: '-13px', fontSize: '20px', marginRight: '10px'}}> ▎◀ </div>
                    <div style={{color: 'white', fontSize: '30px'}}> ▶ </div>
                    <div style={{color: 'white', letterSpacing: '2px', fontSize: '20px' }}> ▶▎ </div>
                    <div></div>
                    <div></div>
                    <div></div>
                </MusicController>
                <TabHandlerBox >
                    <TabHandler rotate={handler.handleTab} onClick={handler.handleListBar}>
                        〈〈
                    </TabHandler>
                </TabHandlerBox>
            </Container>
            <ListBar handletab={handler.handleTab} display={handler.display} />
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

const TabHandler = styled.button<{rotate: boolean}>`
    all: unset;
    font-size: 25px;
    color: white;
    cursor: pointer;
    margin-right: 50px;
    transform: ${props => props.rotate ? 'rotate(180deg)' : 'rotate(0deg)'};
    transition: 0.4s ease;
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