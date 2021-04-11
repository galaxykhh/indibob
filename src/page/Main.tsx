import React from 'react'
import TopMent from '../components/TopMent';
import CategoryStore from '../components/CategoryStore';
import HotTen from '../components/HotTen';
import NewIndie from '../components/NewIndie'

const Main: React.FC = () => {
    return (
        <>
             <TopMent />
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