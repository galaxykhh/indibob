import React from 'react';
import styled from 'styled-components';
import { useGetData } from '../ussGetData'
import MainSonBoxObserver from './MainSongBox';
import LoadingSpinner from './LoadingSpinener'
const path = '/hot10';

const HotTen: React.FC = () => {
    const data = useGetData(path);

    return (
        <>
            {Array.isArray(data) ?
                <Container>
                    {data.map((item, index)=> (
                        <MainSonBoxObserver mr='15px' ml='15px' width='50px'
                                    item={item}
                                    rank={index + 1}
                                    key={index}
                        />))}
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