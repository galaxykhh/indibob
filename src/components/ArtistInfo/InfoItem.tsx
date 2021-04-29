import React from 'react'
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

interface IInfoItem {
    item: {
        id: string;
        albumTitle: string;
        songTitle: string;
        date: number;
        image: string;
    }
}

const InfoItem: React.FC<IInfoItem>= ({item}) => {
    const {id, albumTitle, songTitle, date, image} = item;
    const replacedDate = date.toString().replace(/(\d{4})(\d{2})(\d{2})/g, '$1-$2-$3');
    return (
        <TAContainer>
            <TABox>
                <AlbumCover image={image}/>
                <AlbumTitle> [{albumTitle}] </AlbumTitle>
                <AlbumDate> {replacedDate} </AlbumDate>
                <SongTitle to={`/song/${id}`} > {songTitle} </SongTitle>
            </TABox>
        </TAContainer>
    )
};

export default InfoItem

const AlbumCover = styled.div<{image: string}>`
    text-decoration: none;
    width: 150px;
    height: 150px;
    background-image: url(${props => props.image});
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
    font-size: 15px;
    color: white;
    margin-top: 5px;
`;
const AlbumDate = styled.div`
color: #bbb8b8;
font-size: 15px;
margin-top: 5px;
`;

const SongTitle = styled(NavLink)`
    text-decoration: none;
    font-size: 15px;
    color: white;
    margin-top: 5px;
`;