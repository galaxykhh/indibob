import axios from 'axios';
import { BASE_URL } from '../config';

export const indieInstance = axios.create({
    baseURL: BASE_URL,
});
indieInstance.defaults.headers.common['authorization'] = localStorage.getItem('IndieToken');