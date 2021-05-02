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
    User: IUser = {lastName: '', firstName: '', account: ''};
    constructor() {
        makeObservable(this,{
            isSignIn: observable,
            User: observable,
            signIn: action.bound,
        })
    }

    // 로그인
    async signIn(data: { account: string, password: string }) {

        const response: AxiosResponse =  await authRepository.signIn(data);
        runInAction(() => {
            if (response.data === false) {
                alert('아이디 또는 비밀번호 오류입니다');
            } else if (response) {
                this.User = response.data;
                this.isSignIn = true;
                alert(`${this.User.firstName}님, 반갑습니다!`);
            }
        })
    }

}

const authStore = new AuthStore();
export default authStore;