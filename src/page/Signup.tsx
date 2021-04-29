import React from 'react'
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import AlertMsg from '../AlertMsg';

const Signup: React.FC = () => {
    return (
        <Flex>
            <Input placeholder='아이디' />
            <AlertMsg color='#f1404b'
                      animation='none'
                      visible='block'
                      >
                가능 or 중복 알림
            </AlertMsg>
            <CheckBtn> 중복확인 </CheckBtn>
            <Input placeholder='비밀번호'
                   type='password'
                   />
            <Input placeholder='비밀번호확인'
                   type='password'
                   />
            <AlertMsg color='#f1404b'
                      animation='none'
                      visible='block'
                      >
                일치 or 불일치 알림
            </AlertMsg>
            <NavLink to='signup' >
                <SignupBtn>
                    회원가입
                </SignupBtn>
            </NavLink>
        </Flex>
    )
}

export default Signup;

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
    margin-bottom: 12px;
    margin-top: 12px;
`;

const CheckBtn = styled(SigninBtn)``;

const SignupBtn = styled(SigninBtn)`
    background-color: #4a74ce;
`;
