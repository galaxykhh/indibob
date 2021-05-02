import { useState, useEffect, useRef } from 'react'
import authRepository from '../Repository/authRepository';
import { useForm, SubmitHandler } from 'react-hook-form';
import { AxiosResponse } from 'axios';
import { useHistory } from 'react-router';

interface Inputs {
    firstName: string;
    lastName: string;
    account: string;
    password: string;
    passwordCheck: string;
}

export const useSignup = () => {
    const { register, handleSubmit, trigger, clearErrors, watch, getValues, formState: { errors } } = useForm<Inputs>({ mode: 'onChange' });
    const [duplicated, setDuplicated] = useState<boolean | null>(null);
    const history = useHistory();
    const signUpBtn = useRef<HTMLButtonElement>(null);
    const checkBtn = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        clearErrors();
    }, []); // eslint-disable-line

    useEffect(() => { // 계정 중복확인을 받고나서, input 내용이 달라질 경우 다시 스테이트에 null값을 준다.
        setDuplicated(null);
    }, [watch('account')]) // eslint-disable-line


    const signUp: SubmitHandler<Inputs> = async (data) => {
        if (duplicated === null) {
            alert('아이디 중복확인이 되지 않았습니다');
            return;
        } else if (duplicated === true) {
            return
        } else {
            try {
                const saved = await authRepository.signUp(data);
                if (saved.status === 200) {
                    alert('회원가입이 완료되었습니다');
                    history.push('/signin');
                }
                else if (saved.status === 400) {
                    alert(`서버에 문제가 있습니다.\n잠시 후 다시 시도해주세요`);
                }
            } catch(err) {
                console.log(err);
            }
        }
    }

    const onChange = () => {
        setDuplicated(null);
    }

    const checkDuplicated = async (account: string) => {
        const response: AxiosResponse = await authRepository.checkDuplicated(account);
        if (response.data === false) {
            setDuplicated(false);
        } else {
            setDuplicated(true);
        }
    }

    const enterToSignup = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            signUpBtn.current?.click();
        }
    }

    const enterToCheck = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            checkBtn.current?.click();
        }
    }
    return {
        register,
        handleSubmit,
        trigger,
        watch,
        getValues,
        errors,
        duplicated,
        signUpBtn,
        checkBtn,
        signUp,
        onChange,
        checkDuplicated,
        enterToSignup,
        enterToCheck,
    }
}