import { action, computed, makeObservable, observable, runInAction } from 'mobx';
import authRepository, { ISignIn, ISignUp } from '../repository/authRepository';

interface IUser {
    lastName: string;
    firstName: string;
    account: string;
};

interface IAuthStore {
    isSignIn: boolean;
    user: IUser | null;
};

class AuthStore implements IAuthStore {
    private _isSignIn: boolean = false;
    private _user: IUser | null = null;

    constructor() {
        makeObservable<AuthStore, '_isSignIn' | '_user'>(this,{
            _isSignIn: observable,
            _user: observable,
            isSignIn: computed,
            user: computed,
            setIsSignIn: action,
            setUser: action,
            signIn: action.bound,
            signOut: action.bound,
            deleteAccount: action.bound,
            signUp: action,
        });
    };

    //유효한 토큰을 가지고 있을 경우에, 자동으로 로그인 + 토큰 재발급

    public get isSignIn(): boolean {
        return this._isSignIn;
    };

    public get user(): IUser | null {
        return this._user;
    };

    public setIsSignIn(boolean: boolean): void {
        this._isSignIn = boolean;
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
                    this.setIsSignIn(true);
                    this.setUser(userData);
                } else {
                    return;
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
                    this.setIsSignIn(true);
                };
            });
        } catch(err) {
            alert(`서버가 점검중입니다\n잠시 후 시도해주세요`);
            setTimeout(() => console.clear(), 100);
        };
    };

    public signOut(): void {
        this.setUser(null);
        this.setIsSignIn(false);
        localStorage.removeItem('IndieToken');
    };

    public async deleteAccount(push: () => void): Promise<void> {
        await authRepository.deleteAccount(this.user!.account);
        runInAction(() => {
            this.setIsSignIn(false);
            this.setUser(null);
            push();
        });
    };

    public async signUp(data: ISignUp, push: () => void): Promise<void> {
        try {
            const { data: { message } } = await authRepository.signUp(data);
            runInAction(() => {
                if (message === 'success') {
                    alert('회원가입이 완료되었습니다');
                    push();
                };
            });
        } catch(err) {
            console.log(err);
            alert('서버에 오류가 있습니다');
        };
    };
};

const authStore = new AuthStore();
export default authStore;