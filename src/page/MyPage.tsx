import React from 'react'
import styled from 'styled-components';
import { observer } from 'mobx-react';
import authStore from '../stores/authStore';

const MyPage: React.FC = observer(() => {
    return (
        <Flex>
            <Box>
                <div style={{fontSize: '30px', color: 'white', marginBottom: '20px'}}> 내 정보</div>
                <div style={{fontSize: '30px', color: 'white'}}> 아이디 : {authStore.user?.account} </div>
                <div style={{fontSize: '30px', color: 'white'}}> 이름 : {authStore.user?.lastName}{authStore.user?.firstName} </div>
            </Box>
        </Flex>
    )
})

export default MyPage;

const Flex = styled.div`
    margin-top: 70px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const Box = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    width: 400px;
`;