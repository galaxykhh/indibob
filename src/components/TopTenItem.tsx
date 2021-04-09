import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const TopTenItem: React.FC<{ image: string, title: string, artist: string, rank: number }> = (props) => {
    return (
        <ItemBox>
            <CoverBox>
                <Cover url={props.image} />
            </CoverBox>
            <Rank> {props.rank} </Rank>
            <InfoFlex>
                <Title to='/' > {props.title} </Title>
                <Artist to='/' > {props.artist} </Artist>
            </InfoFlex>
        </ItemBox>
    )
}

export default TopTenItem;

const ItemBox = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    border-bottom: 1px solid #696666;
    padding: 7px;
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

const Rank = styled.div`
    width: 50px;
    margin-left: 15px;
    margin-right:15px;
    text-align: center;
    font-size: 16px;
    color: #e7616a;
`;

const Title = styled(NavLink)`
    margin-bottom: 10px;
    text-decoration: none;
    font-size: 15px;
    color: #ffffff;
`;

const Artist = styled(NavLink)`
    text-decoration: none;
    font-size: 14px;
    color: #c2bebe;
`;