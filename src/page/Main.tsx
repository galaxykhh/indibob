import React from 'react'
import TopMent from '../components/TopMent';
import CategoryBox from '../components/CategoryBox';
import TopTen from '../components/TopTen';

const Main: React.FC = () => {
    return (
        <>
             <TopMent />
            <CategoryBox to='/' category='Top 10 Indie'> 
                <TopTen />
            </CategoryBox>
        </>
    )
}

export default Main;