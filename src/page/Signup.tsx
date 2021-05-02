import React, { useEffect } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { useSignup } from '../Hooks/useSignup';

const Signup: React.FC = () => {
    const signup = useSignup();

    return (
        <Column marginTop='80px' >
            <Row jc='space-between' >
                <Column>
                    <Input width='160px'
                           mr='15px'
                           placeholder='성'
                           {...signup.register('lastName', {
                                pattern: { value:  /[가-힣]/, message: '한글로 정확히 입력해주세요' },
                                required: '성을 입력해주세요'
                                })}
                            />
                    {signup.errors.lastName && <ErrorMsg> {signup.errors.lastName.message} </ErrorMsg>}
                </Column>
                <Column>
                    <Input width='160px'
                           ml='15px'
                           placeholder='이름'
                           {...signup.register('firstName', {
                                pattern: { value:  /[가-힣]/, message: '한글로 정확히 입력해주세요' },
                                required: '이름을 입력해주세요'
                            })}
                            />
                    {signup.errors.firstName && <ErrorMsg> {signup.errors.firstName.message} </ErrorMsg>}
                </Column>
            </Row>
            <Row jc='flex-start'
                 style={{transform: "translateX(+45px)"}}
                 >
                <Input width='385px'
                       placeholder='아이디 (영어 대소문자, 숫자 조합 7~16자)'
                       {...signup.register('account', {
                            required: '아이디를 입력해주세요',
                            pattern: { value: /^[a-zA-Z0-9]+$/, message: '영어, 숫자만을 조합하여 입력해주세요'},
                            minLength: { value: 7, message: '아이디가 너무 짧습니다' },
                            maxLength: { value: 16, message: '아이디가 너무 깁니다' },
                            
                       })}
                        />
                <CheckBtn width='80px'
                          onClick={() => signup.checkDuplicated(signup.getValues('account'))}
                          >
                    중복확인
                </CheckBtn>
            </Row>
            {signup.errors.account && <ErrorMsg> {signup.errors.account?.message} </ErrorMsg>}
            {signup.getValues('account') !== '' && !signup.errors.account && signup.duplicated === false &&
            <div style={{color: '#8CD790', fontSize: '15px'  }}> 사용 가능한 아이디입니다 </div>}
            {signup.getValues('account') !== '' && !signup.errors.account && signup.duplicated === true &&
            <ErrorMsg> 이미 사용중인 아이디입니다 </ErrorMsg>}

            <Input width='385px'
                   placeholder='비밀번호 (조합 상관없이 8~19자)'
                   {...signup.register('password', {
                       required: '비밀번호를 입력해주세요',
                       minLength: { value: 8, message: '비밀번호가 너무 짧습니다' },
                       maxLength: { value: 19, message: '비밀번호가 너무 깁니다' }})}
                       type='password'
                   />
            {signup.errors.password && <ErrorMsg> {signup.errors.password.message} </ErrorMsg>}

            <Input width='385px'
                   placeholder='비밀번호확인'
                   {...signup.register('passwordCheck', {
                       validate: check => check === signup.getValues('password')
                   })}
                   type='password'
                   />
            {signup.errors.passwordCheck && <ErrorMsg> 비밀번호가 일치하지 않습니다 </ErrorMsg>}
            {!signup.errors.password && signup.getValues('password') !== '' && signup.getValues('password') === signup.getValues('passwordCheck') &&
            <div style={{color: '#8CD790', fontSize: '15px'  }}> 비밀번호가 일치합니다 </div>}
            
            <NavLink to='signup' >
                <SignupBtn onClick={signup.handleSubmit(signup.signUp)}
                           width='415px'
                           >
                    확인
                </SignupBtn>
            </NavLink>
        </Column>
    )
}

export default Signup;

const Column = styled.div<{marginTop?: string}>`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: ${props => props.marginTop}
`;

const Row = styled.div<{jc: string}>`
    display: flex;
    flex-direction: row;
    justify-content: ${props => props.jc};
    align-items: center;
`;

interface IInput {
    width: string;
    mr?: string;
    ml?: string;
}

const Input = styled.input<IInput>`
    all: unset;
    border: 1px solid #ffffff; border-radius: 50px;
    width: ${props => props.width};
    height: 50px;
    padding-left: 30px;
    margin-bottom: 12px;
    margin-top: 12px;
    margin-right: ${props => props.mr};
    margin-left: ${props => props.ml};
    color: white;
    &:focus {
        border-color: #f1404b;
    }
`;

const SignupBtn = styled.button<{width: string}>`
    border: 1px solid white; border-radius: 50px;
    font-size: 17px;
    color: white;
    width: ${props => props.width};
    height: 50px;
    cursor: pointer;
    margin-bottom: 12px;
    margin-top: 12px;
    background-color: #f1404b;
`;

const CheckBtn = styled(SignupBtn)`
    background-color: #4a74ce;
    margin-left: 10px;
`;

const ErrorMsg = styled.div`
    font-size: 15px;
    color: #dd3d3d;
    text-align: center;
`;
