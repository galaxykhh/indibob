import React from 'react';
import styled from 'styled-components';
import musicStore from '../../stores/musicStore';
import { observer } from 'mobx-react';


const Top: React.FC = observer(() => {
    return (
        <Container>
            <ImgDiv>
            <Img url={musicStore.currentMusic.image} />
            </ImgDiv>
            <TABox>
                <STitle> asdasd </STitle>
                <Artist> asdasdasdad </Artist>
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
    width: 250px;
    height: 250px;
`;

const Img = styled.div<{ url: string }>`
    width: 250px;
    height: 250px;
    background-size: cover;
    background-position: center;
    background-image: url(${props => props.url});
`;

const TABox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    margin-left: 30px;
    width: 100%;
`;

const STitle = styled.div`
    margin-bottom: 20px;
    font-size: 25px;
    color: white;
    max-width: 200px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const Artist = styled.div`
    font-size: 20px;
    color: white;
    max-width: 150px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

