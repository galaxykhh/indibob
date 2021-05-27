import { action, flow, computed, makeObservable, observable, runInAction } from 'mobx';
import authRepository, { ISignIn, ISignUp } from '../repository/authRepository';

interface IUser {
    lastName: string;
    firstName: string;
    account: string;
};

interface IAuthStore {
    user: IUser | null;
};

class AuthStore implements IAuthStore {
    private _user: IUser | null = null;

    constructor() {
        makeObservable<AuthStore, '_user'>(this,{
            _user: observable,
            user: computed,
            setUser: action,
            signIn: flow,
            signOut: flow,
            deleteAccount: flow,
            signUp: flow,
        });
    };

    //유효한 토큰을 가지고 있을 경우에, 자동으로 로그인 + 토큰 재발급

    public get user(): IUser | null {
        return this._user;
    };

    public setUser(user: IUser | null): void {
        this._user = user;
    };

    public *autoLogin() {
        try {
            const token = localStorage.getItem('IndieToken');
            if (!token) {
                return false;
            };
            const { data: { message, userData } } = yield authRepository.autoLogin(); // 해당 토큰의 계정 정보를 가져옴
            if (message === 'valid token') {
                this.setUser(userData);
                return true;
            };
        } catch(err) {
            console.log(err);
            alert('서버 오류입니다');
        };
    };

    // 로그인
    public *signIn(data: ISignIn) {
        try {
            const { data: { message, userData, token } } =  yield authRepository.signIn(data);
            if (message === 'error') {
                alert('아이디 또는 비밀번호 오류입니다');
                return;
            }
            if (message === 'success') {
                this.setUser(userData);
                localStorage.setItem('IndieToken', token);
                return true;
            };
        } catch(err) {
            alert(`서버가 점검중입니다\n잠시 후 시도해주세요`);
        };
    };

    public signOut(): void {
        this.setUser(null);
        localStorage.removeItem('IndieToken');
    };

    public async deleteAccount(): Promise<boolean | void> {
        try {
            await authRepository.deleteAccount(this.user!.account);
            runInAction(() => {
                this.setUser(null);
                return true;
            });
        } catch(err) {
            console.log(err);
        };
    };

    public async signUp(data: ISignUp): Promise<boolean> {
        try {
            const { data: { message } } = await authRepository.signUp(data);
            runInAction(() => {
                if (message === 'success') {
                    alert('회원가입이 완료되었습니다');
                    return true;
                };
            });
        } catch(err) {
            console.log(err);
            alert('서버에 오류가 있습니다');
        };
        return false;
    };
};

const authStore = new AuthStore();
export default authStore;