import { AxiosResponse } from 'axios';
import { action, makeObservable, observable, runInAction } from 'mobx';
import musicRepository from '../Repository/musicRepository';

interface MusicData {
    id: string;
    songTitle: string;
    artist: string;
    image: string;
    src: string;

}

interface SelectedMusicData extends MusicData {
    albumTitle: string;
    bob: number;
    date: number;
    src: string;
}

class MusicStore {
    temporaryTrack: any;
    playList: MusicData[] = [];
    hotList: MusicData[] | '' = ''; // Array.isArray(array) ?... => 데이터를 받아오지 못했을 때 '' 로 초기화 시켜주어 스피너 활성화
    lastestList: MusicData[] | '' = '';
    playingTrack: MusicData = {id: '', songTitle: '', artist: '', image: '', src: ''};
    selectedTrack: SelectedMusicData = {id: '', albumTitle: '', songTitle: '', artist: '', image: '', bob: 0, date: 0, src: ''};
    constructor() {
        makeObservable(this, {
            temporaryTrack: observable,
            playList: observable,
            hotList: observable,
            lastestList: observable,
            playingTrack: observable,
            selectedTrack: observable,
            getHotList: action,
            getLastestList: action,
            getSelectedTrack: action,
            handleCurrentMusic: action,
            handleAddTrack: action.bound,
            handlePlay: action,
            handleDelete: action,
        });
    };
       // Hot10 곡 리스트를 서버에서 가져온다 [HotTen]
    async getHotList() {
        const response: AxiosResponse = await musicRepository.getData('/hot10');
        runInAction(() => {
        const data = response.data;
            this.hotList = data;
        });
    };
    // Lastest10 곡 리스트를 서버에서 가져온다 [NewIndie]
    async getLastestList() {
        const response: AxiosResponse = await musicRepository.getData('/lastestPath');
        runInAction(() => {
        const data = response.data;
        this.lastestList = data;
        });
    };
    // 내가 클릭한 노래의 정보를 서버에서 받아온다. [SongInfo]
    async getSelectedTrack(parameter: string) {
        const track = { id: parameter }; // 곡 비교를 위해 곡의 고유 id를 담아서 전송
        const response: AxiosResponse = await musicRepository.findTrack('/findPath', track); // findTrack = axios.post
        runInAction(() => {
            const data = response.data;
            this.selectedTrack = data;
        });
    };

    // 재생버튼을 누른 트랙을 재생하고, 리스트에 없을시 자동으로 추가 [MainSongBox]
    handleCurrentMusic(song: MusicData) {
        const duplicated = this.playList.find(list => list.id === song.id) // find 메서드로 같은 id를 가진 노래를 찾아서 리턴
            if (duplicated === undefined) { // 리턴받은것이 없으면 중복되는 노래가 없다는 의미이므로 바로 재생 후 push
                this.playingTrack = song;
                this.playList.push(song);
            } else if (duplicated && duplicated !== this.playingTrack) { // 이미 리스트에 있지만 다른노래 재생중이라 재생을 하고싶을 경우
                this.playingTrack = song;
            } else if (duplicated && duplicated === this.playingTrack) { // 리스트에도 있는데 지금 재생중인 노래를 다시 재생하는경우
                setTimeout(() => this.playingTrack = song, 100);
                this.playingTrack = {id: '', songTitle: '', artist: '', image: '', src: ''}; // 트랙초기화
            }
    };
    
    // 재생목록에 추가 [ListItem]
    handleAddTrack(song: MusicData, callBack: () => void) {
        const duplicated= this.playList.find(list => list.id === song.id);

        if (duplicated === undefined) {
            this.playList.push(song);
        } else if(duplicated) {
            callBack();
        };
    };

    handlePlay(song: MusicData) {
        this.playingTrack = song;
    };

    handleDelete(song: MusicData) {
        this.playList.splice(this.playList.indexOf(song), 1); // indexOf 로 song 조건에 맞는 첫번쨰 인덱스를 리턴받아, splice로 그 인덱스만 삭제처리한다.
    };
};

const musicStore = new MusicStore();
export default musicStore;