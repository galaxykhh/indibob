import React from 'react'
import styled from 'styled-components/';
import Loader from 'react-loader-spinner';
import { observer } from 'mobx-react';

export interface Item {
    id: string;
    image: string;
    songTitle: string;
    artist: string;
    src: string;
};

interface IListItem{
    item: Item;
    isPlaying: boolean;
    handleCurrentMusic: (item: Item) => void;
    handleDelete: (item: Item) => void;
};

const ListItem: React.FC<IListItem> = observer(({ item, isPlaying, handleCurrentMusic, handleDelete }) => {
    const { image, songTitle, artist } = item;
    return (
        <ItemBox >
            <ImgDiv onClick={() => handleCurrentMusic(item)} >
                <Img url={image}>
                    <PlayingLoader type="Audio"
                        color="rgba(255, 255, 255, 0.8)"
                        height={30}
                        width={30}
                        display={isPlaying ? 'block' : 'none'}
                    />
                </Img>
            </ImgDiv>

            <TABox onClick={() => handleCurrentMusic(item)} >
                <Title> {songTitle} </Title>
                <Artist> {artist} </Artist>
            </TABox>

            <DeleteBtn onClick={() => handleDelete(item)} > × </DeleteBtn>
            
        </ItemBox>
    );
});

export default ListItem;

const PlayingLoader = styled(Loader)<{ display: string }>`
    display: ${({ display }) => display};
    background-color: rgba(0, 0, 0, 0.75);
    position: absolute;
`;

const ItemBox = styled.div`
    all: unset;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    border-bottom: .5px solid #7c7a7a;
    padding-left: 4%;
    width: 380px;
    height: 52px;
    cursor: pointer;
    &:hover {
        background-color: rgba(192, 72, 72, 0.2);
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
    background-image: url(${({ url }) => url});
`;

const TABox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    width: 100%;
`;

const Title = styled.div`
    margin-bottom: 3px;
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

const DeleteBtn = styled.button`
    all: unset;
    font-size: 25px;
    color: #9c9a9a;
    padding: 2px;
    margin-right: 6px;
    cursor: pointer;
    font-weight: 100;
    &:hover {
        color: red;
    }
`;