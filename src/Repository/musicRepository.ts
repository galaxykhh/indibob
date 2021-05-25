import { AxiosResponse } from 'axios';
import { indieInstance } from './indieInstance';

class MusicRepository {
    private path = '/api/track';

    public getData(path: string): Promise<AxiosResponse> {
        return indieInstance.get(path);
    };

    public findTrack(id: string): Promise<AxiosResponse> {
        return indieInstance.get(`${this.path}/findtrack/${id}`);
    };

    public fintArtist(artist: string): Promise<AxiosResponse> { // findTrack과 코드는 똑같지만 이름으로 구별하기 쉽기 위해서..
        return indieInstance.get(`${this.path}/findartist/${artist}`);
    };

    public searchTrack(word: string): Promise<AxiosResponse> {
        return indieInstance.get(`${this.path}/search/${word}`);
    };
};

const musicRepository = new MusicRepository();
export default musicRepository;
