import React from 'react'
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { useForm, SubmitHandler } from 'react-hook-form';

type Inputs = {
    account: string;
    password: string;
}

const Signin: React.FC = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>({ mode: 'onChange' })

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        alert(JSON.stringify(data));
    }

    console.log(watch('account'));

    return (
        <Flex>
            <Input placeholder='아이디'
                   {...register('account', {
                       required: '아이디를 입력해주세요',
                       pattern: {
                        value: /^[a-zA-Z0-9]+$/,
                        message: '영문과 숫자만을 조합하여 입력해주세요'
                       }
                   })}
                   />
            {errors.account && <div style={{color: 'red', fontSize: '15px'}}> {errors.account.message} </div>}
            <Input placeholder='비밀번호'
                   {...register('password', {
                       required: '비밀번호를 입력해주세요',
                       minLength: { value: 8, message: '비밀번호를 8자 이상 입력해주세요' },
                       maxLength: { value: 15, message: '비밀번호를 16자 이하로 입력해주세요' }})}
                       type='password'
                   />
            {errors.password && <p style={{color: 'red', fontSize: '15px'}} > {errors.password.message} </p>}
            <SigninBtn onClick={handleSubmit(onSubmit)} >
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

const SignupBtn = styled(SigninBtn)`
    margin-top: 20px;
    background-color: #4a74ce;
`;
