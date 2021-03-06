import React, { useEffect } from 'react';
import styled from 'styled-components';
import musicStore from '../../stores/musicStore';
import MainSongBox from './MainSongBox';
import LoadingSpinner from '../LoadingSpinner';
import { observer } from 'mobx-react';

const NewIndie: React.FC= observer(() => {

    useEffect(() => {
        musicStore.getLatestList();
    }, []);

    return (
        <>
        {Array.isArray(musicStore.latestList) ?
            <Container>
                {musicStore.latestList.map(item => (
                    <MainSongBox width='30px'
                        item={item}
                        key={item.id}
                    />
                ))}
            </Container> : 
            <LoadingSpinner />
        }
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
        width: 470px;
        height: 700px;
    }
`;