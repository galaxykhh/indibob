import React from 'react';
import styled from 'styled-components';
import { useGetData } from '../ussGetData';
import MainSongBoxObserver from './MainSongBox';
import LoadingSpinner from './LoadingSpinener'
const path = 'lastest10';

const NewIndie: React.FC= () => {
    const data = useGetData(path);
    return (
        <>
        {Array.isArray(data) ?
            <Container>
                {data.map((item, index) => (
                    <MainSongBoxObserver width='30px'
                                         item={item}
                                         key={index}
                    />))}
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