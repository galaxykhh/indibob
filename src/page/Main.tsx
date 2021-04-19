import React from 'react'
import TopMent from '../components/Header/TopMent';
import CategoryContainer from '../components/Main/CategoryContainer';
import HotTen from '../components/Main/HotTen';
import NewIndie from '../components/Main/NewIndie'

const Main: React.FC = () => {
    return (
        <>
            <TopMent first='Show Your Indie,' second='Let Me Indie' />
            <CategoryContainer to='/' category='HOT 10 Indie'>
                <HotTen />
            </CategoryContainer>
            <CategoryContainer to='/' category='New Indie'>
                <NewIndie />
            </CategoryContainer>
        </>
    );
};

export default Main;
