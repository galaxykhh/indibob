import { useState, useEffect } from 'react'
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
                await authRepository.signUp(data);
                alert('회원가입이 완료되었습니다');
                history.push('/signin');
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

    return {
        register,
        handleSubmit,
        trigger,
        watch,
        getValues,
        errors,
        duplicated,
        signUp,
        onChange,
        checkDuplicated,
    }
}