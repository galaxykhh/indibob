import { action, computed, makeObservable, observable, runInAction } from 'mobx';
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
            signIn: action.bound,
            signOut: action.bound,
            deleteAccount: action.bound,
            signUp: action,
        });
    };

    //유효한 토큰을 가지고 있을 경우에, 자동으로 로그인 + 토큰 재발급

    public get user(): IUser | null {
        return this._user;
    };

    public setUser(user: IUser | null): void {
        this._user = user;
    };

    public async autoLogin(): Promise<void> {
        try {
            const token = localStorage.getItem('IndieToken');
            if (!token) {
                return
            };
            const { data: { message, userData } } = await authRepository.autoLogin(); // 해당 토큰의 계정 정보를 가져옴
            runInAction(() => {
                if (message === 'valid token') {
                    this.setUser(userData);
                };
            });
        } catch(err) {
            console.log(err);
        };
    };

    // 로그인
    public async signIn(data: ISignIn): Promise<void> {
        try {
            const { data: { message, userData, token } } =  await authRepository.signIn(data);
            runInAction(() => {
                if (message === 'error') {
                    alert('아이디 또는 비밀번호 오류입니다');
                    return;
                }
                if (message === 'success') {
                    this.setUser(userData);
                    localStorage.setItem('IndieToken', token);
                };
            });
        } catch(err) {
            alert(`서버가 점검중입니다\n잠시 후 시도해주세요`);
        };
    };

    public signOut(): void {
        this.setUser(null);
        localStorage.removeItem('IndieToken');
    };

    public async deleteAccount(): Promise<boolean> {
        try {
            await authRepository.deleteAccount(this.user!.account);
            runInAction(() => {
                this.setUser(null);
                return true;
            });
        } catch(err) {
            console.log(err);
        } finally {
            return false;
        }
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
        } finally {
            return false;
        };
    };
};

const authStore = new AuthStore();
export default authStore;