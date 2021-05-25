import { AxiosResponse } from 'axios';
import { indieInstance } from './indieInstance';

interface ISignIn {
    account: string;
    password: string;
};

interface ISignUp extends ISignIn {
    lastName: string;
    firstName: string;
};

class AuthRepository {
    private path = '/api/auth';

    public autoLogin(): Promise<AxiosResponse> {
        return indieInstance.get(`${this.path}/autologin`)
    };

    public checkDuplicated(account: string): Promise<AxiosResponse> {
        return indieInstance.get(`${this.path}/duplicate/${account}`);
    };

    public signUp(data: ISignUp): Promise<AxiosResponse> {
        return indieInstance.post(`${this.path}/signup`, data);
    };

    public signIn(data: ISignIn): Promise<AxiosResponse> {
        return indieInstance.post(`${this.path}/signin`, data);
    };

    public deleteAccount(data: string): Promise<AxiosResponse> {
        return indieInstance.delete(`${this.path}/delete`, {data: { account: data }});
    };
};

const authRepository = new AuthRepository();
export default authRepository;