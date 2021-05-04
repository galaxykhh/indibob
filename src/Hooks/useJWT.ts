import { useEffect } from 'react'
import authStore from '../stores/authStore';

export const useJWT = () => {
    useEffect(() => {
        authStore.autoLogin();
    }, []);
}