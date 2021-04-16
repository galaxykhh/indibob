import React from 'react';
import { NavLink } from 'react-router-dom';
import { observer } from 'mobx-react';
import styled from 'styled-components';
import musicStore from '../../stores/musicStore';

interface IMainSong {
    rank?: number;
    mr?: string;
    ml?: string;
    width?: string;
    item: {
        image: string;
        songTitle: string;
        artist: string;
        bob: number | null;
    };
};

const MainSongBox: React.FC<IMainSong>= ({item, rank, mr, ml, width}) => {
    const { image, songTitle, artist } = item;
    
    return (
        <ItemBox>
            <CoverBox>
                <Cover url={image} />
            </CoverBox>
            <Rank mr={mr} ml={ml} width={width} > {rank} </Rank>
            <InfoFlex>
                <Title onClick={() => musicStore.setCurrentMusic(item)} > {songTitle} </Title>
                <Artist to='/' > {artist} </Artist>
            </InfoFlex>
        </ItemBox>
    )
}

const MainSongBoxObserver = observer(MainSongBox);

export default MainSongBoxObserver;

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

const CoverBox = styled.div`
    width: 50px;
    height: 50px;
`;

const Cover = styled.div<{ url: string }>`
    width: 50px;
    height: 50px;
    background-size: cover;
    background-position: center;
    background-image: url(${props => props.url});
`;

const Rank = styled.div<{width?: string, ml?: string, mr?: string}>`
    width: ${props => props.width};
    margin-left: ${props => props.ml};
    margin-right: ${props => props.mr};
    text-align: center;
    font-size: 16px;
    color: #e7616a;
`;

const Title = styled.div`
    margin-bottom: 10px;
    text-decoration: none;
    font-size: 15px;
    color: #ffffff;
    cursor: pointer;
`;

const Artist = styled(NavLink)`
    text-decoration: none;
    font-size: 14px;
    color: #c2bebe;
`;