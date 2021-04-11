import React from 'react';
import styled from 'styled-components';
import NewIndieItem from './NewIndieItem';
import { useAxios } from './useAxios';
import LoadingSpinner from './LoadingSpinener'
const address = 'http://localhost:8000/songlist';

const NewIndie: React.FC = () => {

    const list = useAxios(address);
    const lastestList = list?.slice();
    lastestList?.sort((a, b) => b.date - a.date)
    let rank = 0;

    return (
        <>
        {Array.isArray(lastestList) ?
            <Container>
            {lastestList.map(item => (
                <NewIndieItem rank={rank+=1} image={item.image} title={item.songTitle} artist={item.artist} key={item.id} />))}
            </Container> : 
             <LoadingSpinner />}
        </>
    );
};
export default NewIndie;

const Container = styled.div`
    display: grid;
    grid-template-rows: repeat(5, 1fr);
    grid-auto-flow: column;
    width: 1000px;
    height: 350px;
    margin-top: 10px;
`;