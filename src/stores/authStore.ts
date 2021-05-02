import { AxiosResponse } from 'axios';
import { action, makeObservable, observable, runInAction } from 'mobx';
import authRepository from '../Repository/authRepository';

class AuthStore {

    constructor() {
        makeObservable(this,{
        })
    }
}

const authStore = new AuthStore();
export default authStore;