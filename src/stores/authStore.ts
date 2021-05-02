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

    // 로그인
    async signIn(data: { account: string, password: string }) {
        const response: AxiosResponse =  await authRepository.signIn(data);
        runInAction(() => {
            if (response.data === false) {
                alert('아이디 또는 비밀번호 오류입니다');
            } else if (response) {
                this.user = response.data;
                this.isSignIn = true;
            }
        })
    }

    signOut() {
        this.user = null;
        this.isSignIn = false;
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