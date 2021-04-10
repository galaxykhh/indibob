import React from 'react'
import TopMent from '../components/TopMent';
import CategoryStore from '../components/CategoryStore';
import HotTen from '../components/HotTen';

const Main: React.FC = () => {
    return (
        <>
             <TopMent />
            <CategoryStore to='/' category='HOT 10'> 
                <HotTen />
            </CategoryStore>
        </>
    )
}

export default Main;