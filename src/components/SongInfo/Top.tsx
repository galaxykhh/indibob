import React, { useEffect } from 'react';
import styled from 'styled-components';
import musicStore from '../../stores/musicStore';
import Modal from '../Modal/Modal';
import { observer } from 'mobx-react';
import { useParams } from 'react-router-dom';

const Top: React.FC = observer(() => {
    const { id }: { id: string } = useParams();
    useEffect(() => {
        musicStore.getSelectedTrack(id);
    }, [id]);

    return (
        <Container>
            <Modal addtrack={musicStore.addDuplicatedTrack}
                   cancel={musicStore.shutDownModal}
                   isopen={musicStore.isOpen}
            >
                <Ment>
                This track is already on the list.<br/><br/>Do you still want to add it?
                </Ment>
            </Modal>
            <ImgDiv>
                <Img url={musicStore.selectedTrack.image} />
            </ImgDiv>
            <TABox>
                <Title> {musicStore.selectedTrack.songTitle} </Title>
                <Artist> {musicStore.selectedTrack.artist} </Artist>
                <BtnBox>
                    <Btn onClick={() => musicStore.handleCurrentMusic(musicStore.selectedTrack)} > ▶ Play </Btn>
                    <Btn onClick={() => musicStore.handleAddTrack(musicStore.selectedTrack)} > + Add </Btn>
                </BtnBox>
            </TABox>
        </Container>
    )
})

export default Top;

const Ment = styled.div`
    color: white;
    font-size: 18px;
    text-align: center;
    margin-top: 10px;
`;

export const Container = styled.div`
    display: flex;
    flex-direction: row;
    margin-top: 100px;
    width: 1000px;
    justify-content: flex-start;
    align-items: center;
`;

const ImgDiv = styled.div`
    width: 200px;
    height: 200px;
`;

const Img = styled.div<{ url: string }>`
    width: 200px;
    height: 200px;
    background-size: cover;
    background-position: center;
    background-image: url(${props => props.url});
`;

const BtnBox = styled.div`
    display: flex;
    flex-direction: row;
    margin-top: 75px;
`;

const TABox = styled.div`
    margin-left: 30px;
    height: 200px;
`;

const Title = styled.div`
    margin-bottom: 10px;
    font-size: 35px;
    color: white;
    max-width: 200px;
    white-space: nowrap;
`;

// const AlbumTitle = styled.div`
//     margin-bottom: 10px;
//     font-size: 20px;
//     color: white;
//     max-width: 200px;
//     white-space: nowrap;
// `;

const Artist = styled.div`
    margin-bottom: 10px;
    font-size: 18px;
    color: white;
    max-width: 150px;
    white-space: nowrap;
`;

const Btn = styled.button`
    all: unset;
    width: 65px;
    height: 45px;
    padding-left: 5px;
    padding-right: 5px;
    border-radius: 15px;
    color: black;
    text-align: center;
    font-size: 19px;
    margin-right: 10px;
    background-color: #dae9f4;
    cursor: pointer;
    transition: all 0.2s ease;
    &:hover {
        color: white;
        background-color: #f1404b; 
    }
`;