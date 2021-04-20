import React, { useEffect } from 'react';
import styled from 'styled-components';
import musicStore from '../../stores/musicStore';
import { observer } from 'mobx-react';
import { useParams } from 'react-router-dom';


const Top: React.FC = observer(() => {
    const { id }: { id: string } = useParams();

    useEffect(() => {
        musicStore.getSelectedTrack(id);
    }, []);

    return (
        <Container>
            <ImgDiv>
                <Img url={musicStore.selectedTrack.image} />
            </ImgDiv>
            <TABox>
                <Title> {musicStore.selectedTrack.songTitle} </Title>
                <Artist> {musicStore.selectedTrack.artist} </Artist>
                <BtnBox>
                    <Btn onClick={() => musicStore.handleCurrentMusic(musicStore.selectedTrack)} > ▶ 재생 </Btn>
                    <Btn onClick={() => musicStore.handleAddTrack(musicStore.selectedTrack)} > + 추가 </Btn>
                </BtnBox>
            </TABox>
        </Container>
    )
})

export default Top;

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

const AlbumTitle = styled.div`
    margin-bottom: 10px;
    font-size: 20px;
    color: white;
    max-width: 200px;
    white-space: nowrap;
`;

const Artist = styled.div`
    margin-bottom: 10px;
    font-size: 18px;
    color: white;
    max-width: 150px;
    white-space: nowrap;
`;

const Btn = styled.button`
    all: unset;
    width: 87px;
    height: 44px;
    border-radius: 15px;
    color: black;
    text-align: center;
    font-size: 19px;
    margin-right: 10px;
    background-color: #ffffff;
    cursor: pointer;
`;