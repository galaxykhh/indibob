import React from 'react';
import { NavLink } from 'react-router-dom';
import { observer } from 'mobx-react';
import styled from 'styled-components/';
import musicStore from '../../stores/musicStore';

interface IMainSong {
    rank?: number;
    mr?: string;
    ml?: string;
    width?: string;
    item: {
        id: string;
        image: string;
        songTitle: string;
        artist: string;
        bob?: number;
        src: string;
    };
};

const MainSongBox: React.FC<IMainSong> = observer(({ item, rank, mr, ml, width }) => {
    const { image, songTitle, artist, id } = item;
    return (
        <ItemBox>
            <AlbumCover url={image} onClick={() => musicStore.handleCurrentMusic(item)} />
            <Rank mr={mr}
                ml={ml}
                width={width}
            >
                {rank}
            </Rank>
            <InfoFlex>
                <Title to={`/song/${id}`}> {songTitle} </Title>
                <Artist to={`/artist/${artist}`} > {artist} </Artist>
            </InfoFlex>
        </ItemBox>
    );
});

const AlbumCover: React.FC<IProp> = ({ onClick, url }) => {
    return (
        <CoverBox onClick={onClick} >
            <PlayIcon>
                ▶
            </PlayIcon>
            <Cover url={url} />
        </CoverBox>
    );
};

export default MainSongBox;

const ItemBox = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    border-bottom: 1px solid #815054;
    padding-bottom: 9px;
    width: 470px;
    height: 50px;
`;

const InfoFlex = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    width: 500px;
    height: 50px;
`;

interface IProp {
    url: string;
    onClick: () => void;
};

const CoverBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50px;
    height: 50px;
`;

const PlayIcon = styled.div`
    position: absolute;
    color: none;
    width: 50px;
    height: 44px;
    text-align: center;
    padding-top: 10px;
    font-size: 0px;
    color: white;
    cursor: pointer;
    &:hover {
        background-image: linear-gradient(
            rgba(0, 0, 0, 0.8),
            rgba(0, 0, 0, 0.8));
        font-size: 30px;
    };
`;

const Cover = styled.div<{ url: string }>`
    width: 50px;
    height: 50px;
    background-size: cover;
    background-position: center;
    background-image: url(${({ url }) => url});
`;

const Rank = styled.div<{ width?: string, ml?: string, mr?: string }>`
    width: ${({ width }) => width};
    margin-left: ${({ ml }) => ml};
    margin-right: ${({ mr }) => mr};
    text-align: center;
    font-size: 16px;
    color: #e7616a;
`;

const Title = styled(NavLink)`
    margin-bottom: 10px;
    text-decoration: none;
    font-size: 15px;
    color: #ffffff;
    &:hover {
    text-decoration: underline;
    }
`;

const Artist = styled(NavLink)`
    text-decoration: none;
    font-size: 14px;
    color: #c2bebe;
    &:hover {
    text-decoration: underline;
    }
`;