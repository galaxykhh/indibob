import React from 'react'
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import AlertMsg from '../AlertMsg';

const Signin: React.FC = () => {
    return (
        <Flex>
            <Input placeholder='아이디' />
            <Input placeholder='비밀번호'
                   type='password'
                   />
            <AlertMsg color='#f1404b'
                      animation='none'
                      visible='block'
                      >
                에러메세지
            </AlertMsg>
            <SigninBtn>
                로그인
            </SigninBtn>
            <div style={{color: '#d1d0d0', marginBottom: '12px'}} > 아직 회원이 아니신가요? </div>
            <div style={{color: '#d1d0d0'}} > 인디밥 회원이 되어 전체 노래를 감상하세요! </div>
            <NavLink to='signup' >
                <SignupBtn>
                    회원가입
                </SignupBtn>
            </NavLink>
        </Flex>
    )
}

export default Signin;

const Flex = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 80px;
`;


const Input = styled.input`
    all: unset;
    border: 1px solid white; border-radius: 50px;
    width: 385px;
    height: 50px;
    padding-left: 30px;
    margin-bottom: 12px;
    margin-top: 12px;
    color: white;
    &:focus {
        border-color: #f1404b;
    }
`;

const SigninBtn = styled.button`
    border: 1px solid white; border-radius: 50px;
    background-color: #f1404b;
    font-size: 17px;
    color: white;
    width: 415px;
    height: 50px;
    cursor: pointer;
    margin-top: 12px;
    margin-bottom: 20px;
`;

const SignupBtn = styled(SigninBtn)`
    margin-top: 20px;
    background-color: #4a74ce;
`;
