import React, { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import authRepository from '../repository/authRepository';
import styled from 'styled-components';
import authStore from '../stores/authStore';
import { flowResult } from 'mobx';

interface Inputs {
    firstName: string;
    lastName: string;
    account: string;
    password: string;
    passwordCheck: string;
}

const SignUp: React.FC = () => {
    const { register, handleSubmit, trigger, setError, watch, formState: { errors } } = useForm<Inputs>();
    const [isChecked, setIsChecked] = useState<boolean>(false);
    const history = useHistory();

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        if (!isChecked) {
            setError('account', { type: 'notChecked' });
            return;
        };
        const isSuccess = await flowResult(authStore.signUp(data));
        if (isSuccess) {
            history.push('/signin');
        };
    };
    
    const checkDuplicated = async (account: string): Promise<void> => {
        try {
            await trigger('account');
            if (errors.account) {
                return;
            };
            const { data: { message } } = await authRepository.checkDuplicated(account);
            if (message === 'duplicated') {
                setError('account', { type: 'duplicated' });
                return
            };
            if (message === 'notExist') {
                setError('account', { type: 'notExist' });
                setIsChecked(true)
            };
        } catch(err) {
            return;
        };
    };

    useEffect(() => { // 계정 중복확인을 받고나서, input 내용이 달라질 경우 다시 false로 변경
        setError('account', {
            type: 'required'
        });
        setIsChecked(false);
    }, [watch('account')]) // eslint-disable-line
    

    return (
        <form onSubmit={handleSubmit(onSubmit)} >
            <Column marginTop='80px' >
                <Row>
                    <Column>
                        <Input width='160px'
                            mr='15px'
                            placeholder='성'
                            {...register('lastName', {
                                pattern: { value:  /[가-힣]+$/, message: '한글로 정확히 입력해주세요' },
                                required: '성을 입력해주세요'
                            })}
                        />
                        {errors.lastName && <ErrorMsg> {errors.lastName.message} </ErrorMsg>}
                    </Column>
                    <Column>
                        <Input width='160px'
                            ml='15px'
                            placeholder='이름'
                            {...register('firstName', {
                                pattern: { value:  /[가-힣]+$/, message: '한글로 정확히 입력해주세요' },
                                required: '이름을 입력해주세요'
                            })}
                        />
                        {errors.firstName && <ErrorMsg> {errors.firstName.message} </ErrorMsg>}
                    </Column>
                </Row>
                    <Input width='385px'
                        placeholder='아이디 (영어 대소문자, 숫자 조합 7~16자)'
                        {...register('account', {
                            required: '아이디를 입력해주세요',
                            pattern: { value: /^[a-zA-Z0-9]+$/, message: '영어, 숫자만을 조합하여 입력해주세요'},
                            minLength: { value: 7, message: '아이디가 너무 짧습니다' },
                            maxLength: { value: 16, message: '아이디가 너무 깁니다' },
                        })}
                    />
                    {errors.account && <ErrorMsg> {errors.account.message} </ErrorMsg>}
                    {errors.account && errors.account.type === 'duplicated' && <ErrorMsg> 이미 사용중인 아이디입니다 </ErrorMsg>}
                    {errors.account && errors.account.type === 'notChecked' && <ErrorMsg> 아이디 중복확인을 해주세요 </ErrorMsg>}
                    {errors.account && errors.account.type === 'notExist' && <Msg> 사용 가능한 아이디입니다 </Msg>}
                    <CheckBtn onClick={() => checkDuplicated(watch('account'))}
                        type='button'
                    >
                        중복확인
                    </CheckBtn>
                <Input width='385px'
                    placeholder='비밀번호 (조합 상관없이 8~19자)'
                    autoComplete='off'
                    type='password'
                    {...register('password', {
                        required: '비밀번호를 입력해주세요',
                        minLength: { value: 8, message: '비밀번호가 너무 짧습니다' },
                        maxLength: { value: 19, message: '비밀번호가 너무 깁니다' }
                    })}
                />
                {errors.password && <ErrorMsg> {errors.password.message} </ErrorMsg>}

                <Input width='385px'
                    placeholder='비밀번호확인'
                    autoComplete='off'
                    type='password'
                    {...register('passwordCheck', {
                        required: '비밀번호를 입력해주세요',
                        validate: check => check === watch('password')
                    })}
                />
                {errors.passwordCheck && <ErrorMsg> {errors.passwordCheck.message} </ErrorMsg>}
                {errors.passwordCheck && errors.passwordCheck.type === 'validate' && <ErrorMsg> 비밀번호가 일치하지 않습니다 </ErrorMsg>}
                    <SignUpBtn onClick={handleSubmit(onSubmit)}
                        type='submit'
                    >
                        확인
                    </SignUpBtn>
            </Column>
        </form>
    )
}

export default SignUp;

const Column = styled.div<{ marginTop?: string }>`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: ${({ marginTop }) => marginTop};
`;

const Row = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

const Input = styled.input<{ width: string, mr?: string, ml?: string }>`
    all: unset;
    border: 1px solid #ffffff; border-radius: 50px;
    width: ${({ width }) => width};
    height: 50px;
    padding-left: 30px;
    margin-bottom: 12px;
    margin-top: 12px;
    margin-right: ${({ mr }) => mr};
    margin-left: ${({ ml }) => ml};
    color: white;
    &:focus {
        border-color: #f1404b;
    };
`;

const SignUpBtn = styled.button`
    border: 1px solid white; border-radius: 50px;
    font-size: 17px;
    color: white;
    width: 415px;
    height: 50px;
    cursor: pointer;
    margin-bottom: 12px;
    margin-top: 12px;
    background-color: #f1404b;
`;

const CheckBtn = styled(SignUpBtn)`
    background-color: #4a74ce;
`;

const ErrorMsg = styled.div`
    font-size: 15px;
    color: #dd3d3d;
    text-align: center;
`;

const Msg = styled(ErrorMsg)`
    color: #8CD790;
`;
