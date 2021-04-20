import { AxiosResponse } from 'axios';
import { action, makeObservable, observable, runInAction } from 'mobx';
import musicRepository from '../Repository/musicRepository';

interface MusicData {
    id: string;
    songTitle: string;
    artist: string;
    image: string;
}

interface SelectedMusicData extends MusicData {
    albumTitle: string;
    bob: number;
    date: number;
}

class MusicStore {
    playList: MusicData[] = [];

    hotList: MusicData[] | '' = ''; // Array.isArray(array) ?... => 데이터를 받아오지 못했을 때 '' 로 초기화 시켜주어 스피너 활성화
    lastestList: MusicData[] | '' = '';

    currentTrack: MusicData = {id: '', songTitle: '', artist: '', image: ''};
    selectedTrack: SelectedMusicData = {id: '', albumTitle: '', songTitle: '', artist: '', image: '', bob: 0, date: 0};

    hotPath: string = '/hot10';
    lastestPath: string = '/lastest10';
    findPath: string = '/findtrack';

    constructor() {
        makeObservable(this, {
            playList: observable,
            hotList: observable,
            lastestList: observable,
            currentTrack: observable,
            selectedTrack: observable,
            getHotList: action,
            getLastestList: action,
            getSelectedTrack: action,
            handleCurrentMusic: action,
            handlePlay: action,
            handleDelete: action,
        });
    };

    async getHotList() {
        const response: AxiosResponse = await musicRepository.getData(this.hotPath);
        runInAction(() => {
        const data = response.data;
            this.hotList = data;
        });
    };

    async getLastestList() {
        const response: AxiosResponse = await musicRepository.getData(this.lastestPath);
        runInAction(() => {
        const data = response.data;
        this.lastestList = data;
        });
    };

    async getSelectedTrack(parameter: string) {
        const track = { id: parameter };
        const response: AxiosResponse = await musicRepository.findTrack(this.findPath, track);
        runInAction(() => {
            const data = response.data;
            this.selectedTrack = data;
        });
    };

    handleCurrentMusic(song: MusicData) {
        const findDuplicated = this.playList.find(list => list.id === song.id) // find 메서드로 같은 id를 가진 노래를 찾아서 리턴
            if (findDuplicated === undefined) { // 리턴받은것이 없으면 중복되는 노래가 없다는 의미이므로 바로 push
                this.currentTrack = song;
                this.playList.push(song);
            } else {
                return; // 이미 있는곡인데, 그래도 추가할거냐는 질문을 한뒤, yes / no 로 핸들링 추후에 추가하기.
            };
    };

    handleAddTrack(song: MusicData) {
        const findDuplicated = this.playList.find(list => list.id === song.id);
            if (findDuplicated === undefined) {
                this.playList.push(song);
            } else {
                return;
            };
    }

    handlePlay(song: MusicData) {
        this.currentTrack = song;
    };

    handleDelete(song: MusicData) {
        this.playList.splice(this.playList.indexOf(song), 1); // indexOf 로 song 조건에 맞는 첫번쨰 인덱스를 리턴받아, splice로 그 인덱스만 삭제처리한다.
    };
};

const musicStore = new MusicStore();
export default musicStore;