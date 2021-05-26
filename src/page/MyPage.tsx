import React from 'react'
import styled from 'styled-components';
import { observer } from 'mobx-react';
import authStore from '../stores/authStore';
import { useHistory } from 'react-router';

const MyPage: React.FC = observer(() => {
    const history = useHistory();
    
    const deleteAccount = async (): Promise<void> => {
        const isSuccess = await authStore.deleteAccount();
        if (isSuccess) {
            history.push('/');
        };
    };

    return (
        <Flex>
            <Box>
                <div style={{fontSize: '20px', color: 'white', marginBottom: '20px'}}> 내 정보</div>
                <div style={{fontSize: '20px', color: 'white'}}> 아이디 : {authStore.user?.account} </div>
                <div style={{fontSize: '20px', color: 'white'}}> 이름 : {authStore.user?.lastName}{authStore.user?.firstName} </div>
                <DeleteAccount onClick={deleteAccount} >
                    회원탈퇴
                </DeleteAccount>
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

const DeleteAccount = styled.button`
    all: unset;
    margin-top: 20px;
    width: 90px;
    height: 30px;
    background-color: #bd4343;
    border: 1px solid white;
    border-radius: 90px;
    text-align: center;
    color: white;
    cursor: pointer;
`;