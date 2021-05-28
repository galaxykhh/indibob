import React from 'react'
import TopAnnounce from '../components/Header/TopAnnounce';
import CategoryContainer from '../components/Main/CategoryContainer';
import HotTen from '../components/Main/HotTen';
import NewIndie from '../components/Main/NewIndie'
import { observer } from 'mobx-react';

const Main: React.FC = observer(() => {

    return (
        <>
            <TopAnnounce first='Show Your Indie,' second='Let Me Indie' />
            <CategoryContainer to='/' category='HOT 10 Indie'>
                <HotTen />
            </CategoryContainer>
            <CategoryContainer to='/' category='New Indie'>
                <NewIndie />
            </CategoryContainer>
        </>
    );
});

export default Main;
