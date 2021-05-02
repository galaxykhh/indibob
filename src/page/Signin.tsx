import React from 'react'
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';

interface Inputs {
    account: string;
    password: string;
}

const Signin: React.FC = () => {
    const { register, handleSubmit, setError, formState: { errors } } = useForm<Inputs>({ mode: 'onChange' })

    const signIn = (data: Inputs) => {
        if (data.account === 'hankoon' && data.password === 'z1x2c3z1x2c3') { // test
            alert(JSON.stringify(data));
        } else {
            setError('password', {
                message: '가입되지 않은 계정이거나 잘못된 비밀번호입니다'
            });
        }
    }

    return (
        <Flex>
            <Input placeholder='아이디'
                   {...register('account', {
                       required: '아이디를 입력해주세요',
                       pattern: { value: /^[a-zA-Z0-9]+$/, message: '영문과 숫자만을 조합하여 입력해주세요'},
                       minLength: { value: 5, message: '아이디가 너무 짧습니다' },
                       maxLength: { value: 19, message: '아이디가 너무 깁니다' },
                   })}
                   />
            {errors.account && <ErrorMsg> {errors.account.message} </ErrorMsg>}
            <Input placeholder='비밀번호'
                   {...register('password', {
                       required: '비밀번호를 입력해주세요',
                       minLength: { value: 8, message: '비밀번호가 너무 짧습니다' },
                       maxLength: { value: 19, message: '비밀번호가 너무 깁니다' }})}
                       type='password'
                   />
            {errors.password && <ErrorMsg> {errors.password.message} </ErrorMsg>}
            <SigninBtn onClick={handleSubmit(signIn)} >
                로그인
            </SigninBtn>
            <div style={{color: '#ffffff', marginBottom: '12px'}} > 아직 회원이 아니신가요? </div>
            <div style={{color: '#ffffff'}} > 인디밥 회원이 되어 전체 노래를 감상해보세요! </div>
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


const Input = styled.input.attrs(props => ({
    name: props.name,
    ref: props.ref,
}))`
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

const ErrorMsg = styled.div`
    font-size: 15px;
    color: #dd3d3d;
`;

const SignupBtn = styled(SigninBtn)`
    margin-top: 20px;
    background-color: #4a74ce;
`;
