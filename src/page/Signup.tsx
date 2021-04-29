import React, { useEffect } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

interface Inputs {
    account: string;
    password: string;
    passwordCheck: string;
}

const Signup: React.FC = () => {
    const id = [
        {
            id: '1',
            account: 'hankoon'
        }
    ]
    const { register, handleSubmit, trigger, watch, formState: { errors } } = useForm<Inputs>({ mode: 'onChange' });

    useEffect(() => {
        trigger('account')
    }, []);

    const checkDuplicate = (account: string) => {
        const tried = id.find(x => x.account === account);
        if (tried) {
            return false;
        } else if(!tried){
            return true;
        }
    }

    const signUp: SubmitHandler<Inputs> = (data) => {
        alert(JSON.stringify(data));
    }

    return (
        <Flex>
            <Input placeholder='아이디 (영어 대소문자, 숫자 조합 7~16자)'
                   {...register('account', {
                        required: '아이디를 입력해주세요',
                        pattern: { value: /^[a-zA-Z0-9]+$/, message: '영어, 숫자만을 조합하여 입력해주세요'},
                        minLength: { value: 7, message: '아이디가 너무 짧습니다' },
                        maxLength: { value: 16, message: '아이디가 너무 깁니다' },
                        validate: {
                            checkAccount: async(account) => await checkDuplicate(account) || '이미 사용중인 아이디입니다'
                        }
                   })}
                   />
            {errors.account && <div style={{color: '#f1404b', fontSize: '15px'}}> {errors.account?.message} </div>}
            {!errors.account && watch('account') !== null && <div style={{color: 'green', fontSize: '15px'  }}> 사용 가능한 아이디입니다 </div>}
            <Input placeholder='비밀번호 (조합 상관없이 8~19자)'
                   {...register('password', {
                       required: '비밀번호를 입력해주세요',
                       minLength: { value: 8, message: '비밀번호가 너무 짧습니다' },
                       maxLength: { value: 19, message: '비밀번호가 너무 깁니다' }})}
                       type='password'
                   />
            {errors.password && <div style={{color: '#f1404b', fontSize: '15px'}} > {errors.password.message} </div>}
            <Input placeholder='비밀번호확인'
                   {...register('passwordCheck', {
                       validate: check => check === watch('password')
                   })}
                   type='password'
                   />
            {errors.passwordCheck && <div style={{color: '#f1404b', fontSize: '15px'}} > 비밀번호가 일치하지 않습니다 </div>}
            <NavLink to='signup' >
                <SignupBtn onClick={handleSubmit(signUp)}>
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
    border: 1px solid #ffffff; border-radius: 50px;
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

const Alert = styled.div<{color: string, display: string}>`
    font-size: 15px;
    color: ${props => props.color};
    display: ${props => props.display};
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
