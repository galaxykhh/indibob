import React from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react';
import { NavLink } from 'react-router-dom';

interface IResultItem {
    image: string;
    songTitle: string;
    artist: string;
    id: string;
}

const ResultItem: React.FC<IResultItem> = observer(({id, image, songTitle, artist}) => {
    return (
        <ItemBox to={`/song/${id}`} >
            <Img img={image} />
            <Result> {artist} - {songTitle} </Result>
        </ItemBox>
    )
})

export default ResultItem;

const Img = styled.div<{img: string}>`
    width: 20px;
    height: 20px;
    margin-right: 10px;
    background-size: cover;
    background-position: center;
    background-image: url(${props => props.img})
`;

const ItemBox = styled(NavLink)`
    text-decoration: none;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    height: 40px;
`;

const Result = styled.span`
    font-size: 15px;
    color: white;
`;
