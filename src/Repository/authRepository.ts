import { indieInstance } from './musicRepository';

class AuthRepository {

    checkDuplicated(account: string) {
        return indieInstance.get(`/api/auth/duplicate/${account}`);
    }

    signUp(data: object) {
        return indieInstance.post('/api/auth/signup', data);
    }

    signIn(data: any) {
        return indieInstance.post('/api/auth/signin', data);
    }
}

const authRepository = new AuthRepository();
export default authRepository;