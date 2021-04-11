import React from 'react';
import styled from 'styled-components';
import NewIndieItem from './NewIndieItem';
import { useAxios } from './useAxios';
import Loader from 'react-loader-spinner';
const address = 'http://localhost:8000/newindie';

const NewIndie: React.FC = () => {

    const list = useAxios(address);

    return (
        <>
        {list.data ?
            <Container>
            {list.data.map(item => (
                <NewIndieItem rank={item.id} image={item.image} title={item.title} artist={item.artist} key={item.id} />))}
            </Container> : 
            <LoadContainer>
                <Loader type="Oval" color="#f1404b" height={50} width={50} />
            </LoadContainer>}
        </>
    )
}
export default NewIndie;

const Container = styled.div`
    display: grid;
    grid-template-rows: repeat(5, 1fr);
    grid-auto-flow: column;
    width: 1000px;
    height: 350px;
    margin-top: 10px;
`;

const LoadContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 1000px;
    height: 350px;
    margin-top: 10px;
`;