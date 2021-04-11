import React from 'react';
import styled from 'styled-components';
import HotTenItem from './HotTenItem';
import { useAxios, HType } from './useAxios';
import LoadingSpinner from './LoadingSpinener'
const address = 'http://localhost:8000/songlist';

const HotTen: React.FC = () => {

    const list = useAxios(address);
    const rankedList = list?.slice();
    rankedList?.sort((a, b) => b.bob - a.bob)
    let rank = 0

    return (
        <>
        {Array.isArray(rankedList) ? // Array.isArray() = 어레이인지 판별하는 프로토타입 메소드. true 랑 false를 리턴.
            <Container>
            {rankedList.map(item => (
                <HotTenItem rank={rank+=1} image={item.image} title={item.songTitle} artist={item.artist} key={item.id} />))}
            </Container> : 
            <LoadingSpinner />}
        </>
    )
}
export default HotTen;

const Container = styled.div`
    display: grid;
    grid-template-rows: repeat(5, 1fr);
    grid-auto-flow: column;
    width: 1000px;
    height: 350px;
    margin-top: 10px;
`;