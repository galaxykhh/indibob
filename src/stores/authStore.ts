import { AxiosResponse } from 'axios';
import { action, makeObservable, observable, runInAction } from 'mobx';
import authRepository from '../Repository/authRepository';

interface IUser {
    lastName: string;
    firstName: string;
    account: string;
}

class AuthStore {
    isSignIn: boolean = false;
    user: IUser | null = null;
    constructor() {
        makeObservable(this,{
            isSignIn: observable,
            user: observable,
            signIn: action.bound,
            signOut: action.bound,
            deleteAccount: action.bound,
        })
    }

    //유효한 토큰을 가지고 있을 경우에, 자동으로 로그인 + 토큰 재발급
    async autoLogin() {
        const token = localStorage.getItem('IndieToken');
        if (!token) {
            return
        }
        const data = await authRepository.autoLogin(); // 해당 토큰의 계정 정보를 가져옴
        if (data.data.message === 'invalid') {
            return;
        }
        this.signIn(data.data);
    }

    // 로그인
    async signIn(data: { account: string, password: string }) {
        try {
            const response: AxiosResponse =  await authRepository.signIn(data);
            runInAction(() => {
                if (response.data.message === 'error') {
                    alert('아이디 또는 비밀번호 오류입니다');
                } else if (response.status === 200 && response.data.message === 'success') {
                    this.user = response.data.user;
                    localStorage.setItem('IndieToken', response.data.token);
                    this.isSignIn = true;
                }
            })
        } catch(err) {
            alert(`서버가 점검중입니다\n잠시 후 시도해주세요`);
            setTimeout(() => console.clear(), 100);
        }
    }

    signOut() {
        this.user = null;
        this.isSignIn = false;
        localStorage.removeItem('IndieToken');
    }

    async deleteAccount(push: () => void) {
        await authRepository.deleteAccount(this.user!.account);
        runInAction(() => {
            this.isSignIn = false;
            this.user = null;
            push();
        })
    }
}

const authStore = new AuthStore();
export default authStore;