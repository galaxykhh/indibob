import React from 'react'
import styled from 'styled-components/';
import musicStore from '../../stores/musicStore';

interface IListItem{
    item: {
        image: string;
        songTitle: string;
        artist: string;
    };
};

const ListItem: React.FC<IListItem>= ({item}) => {
    const { image, songTitle, artist } = item
    return (
        <ItemContainer onClick={() => musicStore.forcePlay(item)} >
            <ImgDiv>
                <Img url={image} />
            </ImgDiv>
            <TABox>
                <STitle> {songTitle} </STitle>
                <Artist> {artist} </Artist>
            </TABox>
        </ItemContainer>
    )
}

export default ListItem;

const ItemContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    border-bottom: .5px solid #b4b4b4;
    margin-left: 15px;
    width: 90%;
    height: 70px;
    cursor: pointer;
`;

const ImgDiv = styled.div`
    margin-top: 15px;
    margin-bottom: 15px;
    width: 40px;
    height: 40px;
`;

const Img = styled.div<{ url: string }>`
    width: 40px;
    height: 40px;
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
    font-size: 12px;
    color: white;
    max-width: 150px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const Artist = styled.div`
    font-size: 10px;
    margin-left: 15px;
    color: white;
    max-width: 150px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;