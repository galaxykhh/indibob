import React from 'react'
import styled from 'styled-components';
import { observer } from 'mobx-react';

const Info: React.FC = observer(() => {
    return (
        <Container>
            <Artist> 아티스트 </Artist>
            <SongList> 해당 아티스트 노래 목록 </SongList>
            <TAContainer>
                <TABox>
                    <AlbumCover />
                    <AlbumTitle> {`[앨범이름]`} </AlbumTitle>
                    <SongTitle> 노래이름 </SongTitle>
                </TABox>
                <TABox>
                    <AlbumCover />
                    <AlbumTitle> {`[앨범이름]`} </AlbumTitle>
                    <SongTitle> 노래이름 </SongTitle>
                </TABox>
                <TABox>
                    <AlbumCover />
                    <AlbumTitle> {`[앨범이름]`} </AlbumTitle>
                    <SongTitle> 노래이름 </SongTitle>
                </TABox>
                <TABox>
                    <AlbumCover />
                    <AlbumTitle> {`[앨범이름]`} </AlbumTitle>
                    <SongTitle> 노래이름 </SongTitle>
                </TABox>
            </TAContainer>
        </Container>
    )
});

export default Info

const Container = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 100px;
    width: 1000px;
`;

const Artist = styled.div`
    margin-bottom: 45px;
    font-size: 31px;
    color: white;
`;

const SongList = styled.div`
    margin-bottom: 45px;
    font-size: 25px;
    color: white;
`;

const AlbumCover = styled.div`
    width: 150px;
    height: 150px;
    background-image: url('https://images.otwojob.com/product/w/a/R/waR0ImJfrYeVCPw.png/o2j/resize/852x622%3E');
    background-size: cover;
    background-position: center;
`;

const TAContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
`;

const TABox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    width: 200px;
`;

const AlbumTitle = styled.div`
    color: white;
    margin-top: 5px;
`;

const SongTitle = styled.div`
    color: white;
    margin-top: 5px;
`;