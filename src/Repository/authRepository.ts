import { indieInstance } from './musicRepository';

class AuthRepository {

    checkDuplicated(account: string) {
        return indieInstance.get(`/api/auth/duplicate/${account}`);
    }

    signUp(path: string, data: any) {
        return indieInstance.post(path, data);
    }

    signIn(path: string, data: any) {
        return indieInstance.post(path, data);
    }
}

const authRepository = new AuthRepository();
export default authRepository;