import axios, { AxiosPromise } from 'axios';

export interface HType {
    albumTitle: string;
    songTitle: string;
    artist: string;
    image: string;
    bob: number;
    date: number;
}

const indieInstance = axios.create({
    baseURL: 'http://localhost:8000'
});

class MusicRepository {
    constructor() {}

    getData(path: string): AxiosPromise {
        return indieInstance.get(path);
    }
}

const musicRepository = new MusicRepository;
export default musicRepository;