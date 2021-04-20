import axios, { AxiosPromise } from 'axios';

const indieInstance = axios.create({
    baseURL: 'http://localhost:8000'
});

class MusicRepository {

    getData(path: string): AxiosPromise {
        return indieInstance.get(path);
    }

    findTrack(path: string, data: { id: string }): AxiosPromise {
        return indieInstance.post(path, data);
    }
}

const musicRepository = new MusicRepository();
export default musicRepository;