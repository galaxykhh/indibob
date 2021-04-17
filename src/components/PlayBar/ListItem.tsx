import React from 'react'
import styled from 'styled-components/';
import musicStore from '../../stores/musicStore';

interface IListItem{
    item: {
        id: number;
        image: string;
        songTitle: string;
        artist: string;
    };
};

const ListItem: React.FC<IListItem>= ({item}) => {
    const { image, songTitle, artist, id } = item
    return (
        <ItemBox >
            <ImgDiv onClick={() => musicStore.playThis(item)} >
                <Img url={image} />
            </ImgDiv>
            <TABox onClick={() => musicStore.playThis(item)} >
                <STitle> {songTitle} </STitle>
                <Artist> {artist} </Artist>
                <IdStorage> {id} </IdStorage>
            </TABox>
            <DeleteBtn onClick={() => musicStore.deleteThis(item)} > × </DeleteBtn>
        </ItemBox>
    )
}

export default ListItem;

const ItemBox = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    border-bottom: .5px solid #7c7a7a;
    padding-left: 4%;
    width: 280px;
    height: 52px;
    cursor: pointer;
    &:hover {
        background-color: #3b3a3a;
    }
`;

const ImgDiv = styled.div`
    margin-top: 15px;
    margin-bottom: 15px;
    width: 30px;
    height: 30px;
`;

const Img = styled.div<{ url: string }>`
    width: 30px;
    height: 30px;
    background-size: cover;
    background-position: center;
    background-image: url(${props => props.url});
`;

const TABox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    width: 100%;
`;

const STitle = styled.div`
    margin-bottom: 10px;
    margin-left: 15px;
    font-size: 12px;
    color: white;
    max-width: 200px;
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

const IdStorage = styled.div`
    display: none;
`;

const DeleteBtn = styled.button`
    all: unset;
    font-size: 25px;
    color: #9c9a9a;
    padding: 2px;
    cursor: pointer;
    font-weight: 100;
    &:hover {
        color: red;
    }
`;