import axios, { AxiosPromise } from 'axios';

export const indieInstance = axios.create({
    baseURL: 'http://localhost:8000'
});
indieInstance.defaults.headers.common['authorization'] = localStorage.getItem('IndieToken');

class MusicRepository {

    getData(path: string): AxiosPromise {
        return indieInstance.get(path);
    }

    findTrack(id: string): AxiosPromise {
        return indieInstance.get(`/api/track/findtrack/${id}`);
    }

    fintArtist(artist: string): AxiosPromise { // findTrack과 코드는 똑같지만 이름으로 구별하기 쉽기 위해서..
        return indieInstance.get(`/api/track/findartist/${artist}`);
    }

    searchTrack(word: string): AxiosPromise {
        return indieInstance.get(`/api/track/search/${word}`);
    }
}

const musicRepository = new MusicRepository();
export default musicRepository;
