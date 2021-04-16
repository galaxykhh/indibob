import React from 'react'
import TopMent from '../components/TopMent';
import CategoryStore from '../components/Main/CategoryStore';
import HotTen from '../components/Main/HotTen';
import NewIndie from '../components/Main/NewIndie'

const Main: React.FC = () => {
    return (
        <>
            <TopMent first='Show Your Indie,' second='Let Me Indie' />
            <CategoryStore to='/' category='HOT 10 Indie'>
                <HotTen />
            </CategoryStore>
            <CategoryStore to='/' category='New Indie'>
                <NewIndie />
            </CategoryStore>
        </>
    )
}

export default Main;
