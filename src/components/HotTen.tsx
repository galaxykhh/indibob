import React from 'react';
import styled from 'styled-components';
import HotTenItem from './HotTenItem';
import { useAxios } from './useAxios';
import LoadingContainer from './LoadingContainer'
const address = 'http://localhost:8000/hotten';

const HotTen: React.FC = () => {

    const list = useAxios(address);

    return (
        <>
        {list.data ?
            <Container>
            {list.data.map(item => (
                <HotTenItem rank={item.id} image={item.image} title={item.title} artist={item.artist} key={item.id} />))}
            </Container> : 
            <LoadingContainer />}
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