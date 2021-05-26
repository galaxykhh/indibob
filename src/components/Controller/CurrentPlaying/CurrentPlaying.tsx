import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { MusicData } from "../../../stores/musicStore";

interface ICurrentPlaying {
    playList: MusicData[]
    currentIndex: number;
}

const CurrentPlaying: React.FC<ICurrentPlaying> = ({ playList, currentIndex }) => {
    return (
        <Container>
            <ImgBox>
                <Img url={playList[currentIndex]?.image} />
            </ImgBox>
            <TABox>
                <SongTitle to={`/song/${playList[currentIndex]?.id}`}>
                    {playList[currentIndex]?.songTitle}
                </SongTitle>
                <Artist> {playList[currentIndex]?.artist} </Artist>
            </TABox>
        </Container>
    );
};

export default CurrentPlaying;

const Container = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    margin-left: 15px;
    width: 35%;
    height: 110px;
`;

const ImgBox = styled.div`
    margin-top: 15px;
    margin-bottom: 15px;
    width: 70px;
    height: 70px;
`;

const Img = styled.div<{ url: string }>`
    width: 70px;
    height: 70px;
    background-size: cover;
    background-position: center;
    background-image: url(${({ url }) => url});
`;

const TABox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
`;

const SongTitle = styled(NavLink)`
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
