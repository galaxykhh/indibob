import React, { useEffect } from 'react';
import styled from 'styled-components';
import MainSonBoxObserver from './MainSongBox';
import LoadingSpinner from '../../LoadingSpinener'
import musicStore from '../../stores/musicStore';
import { observer } from 'mobx-react';

const HotTen: React.FC = observer(() => {

    useEffect(() => {
        musicStore.getHotList();
    }, []);

    return (
        <>
            {Array.isArray(musicStore.hotList) ?
                <Container>
                    {musicStore.hotList.map((item, index) => (
                        <MainSonBoxObserver mr='15px'
                                            ml='15px'
                                            width='50px'
                                            item={item}
                                            rank={index + 1}
                                            key={item.id}
                                            />
                    ))}
                </Container> :
                <LoadingSpinner />}
        </>
    )
})

export default HotTen;

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