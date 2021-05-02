import axios, { AxiosPromise } from 'axios';

export const indieInstance = axios.create({
    baseURL: 'http://localhost:8000'
});

class MusicRepository {

    getData(path: string): AxiosPromise {
        return indieInstance.get(path);
    }

    findTrack(path: string, id: string): AxiosPromise {
        return indieInstance.get(`${path}/${id}`);
    }

    fintArtist(path: string, artist: string): AxiosPromise { // findTrack과 코드는 똑같지만 이름으로 구별하기 쉽기 위해서..
        return indieInstance.get(`${path}/${artist}`);
    }

    searchTrack(path: string, word: string): AxiosPromise {
        return indieInstance.get(`${path}/${word}`);
    }
}

const musicRepository = new MusicRepository();
export default musicRepository;
