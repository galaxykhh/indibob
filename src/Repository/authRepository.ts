import {indieInstance} from './musicRepository';

export interface IsignIn {
    account: string;
    password: string;
}

interface IsignUp extends IsignIn {
    lastName: string;
    firstName: string;
}

class AuthRepository {

    autoLogin() {
        return indieInstance.get(`/api/auth/autologin`)
    }

    checkDuplicated(account: string) {
        return indieInstance.get(`/api/auth/duplicate/${account}`);
    }

    signUp(data: IsignUp) {
        return indieInstance.post('/api/auth/signup', data);
    }

    signIn(data: IsignIn) {
        return indieInstance.post('/api/auth/signin', data);
    }

    deleteAccount(data: string) {
        return indieInstance.delete('/api/auth/delete', {data: { account: data }});
    }
}

const authRepository = new AuthRepository();
export default authRepository;