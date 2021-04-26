import React, { useEffect } from 'react';
import styled from 'styled-components';
import musicStore from '../../stores/musicStore';
import MainSongBoxObserver from './MainSongBox';
import LoadingSpinner from '../../LoadingSpinener'
import { observer } from 'mobx-react';

const NewIndie: React.FC= observer(() => {

    useEffect(() => {
        musicStore.getLastestList();
    }, [])

    return (
        <>
        {Array.isArray(musicStore.lastestList) ?
            <Container>
                {musicStore.lastestList.map(item => (
                    <MainSongBoxObserver width='30px'
                                         item={item}
                                         key={item.id}
                                         />
                ))}
            </Container> : 
             <LoadingSpinner />}
        </>
    );
});
export default NewIndie;

const Container = styled.div`
    display: grid;
    grid-template-rows: repeat(5, 1fr);
    grid-auto-flow: column;
    width: 1000px;
    height: 350px;
    margin-top: 10px;
    @media only screen and (max-width: 850px) {
        grid-template-rows: repeat(10, 1fr);
        width: 500px;
        height: 700px;
    }
`;