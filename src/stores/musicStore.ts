import { AxiosResponse } from 'axios';
import { action, makeObservable, observable } from 'mobx';
import musicRepository from '../Repository/musicRepository';

export interface MusicData {
    id: number;
    songTitle: string;
    artist: string;
    image: string;
}

class MusicStore {
    playList: MusicData[] = [];
    hotList: MusicData[] | '' = '';
    lastestList: MusicData[] | '' = '';
    hotPath: string = '/hot10';
    lastestPath: string = 'lastest10';
    currentMusic: MusicData = {image: '', songTitle: '', artist: '', id: 0};
    constructor() {
        makeObservable(this, {
            playList: observable,
            hotList: observable,
            lastestList: observable,
            currentMusic: observable,
            handleCurrentMusic: action,
            handlePlay: action,
            handleDelete: action,
        })
    }

    async getHotList() {
        const response: AxiosResponse = await musicRepository.getData(this.hotPath);
        const data = await response.data;
        this.hotList = await data;
    }

    async getLastestList() {
        const response: AxiosResponse = await musicRepository.getData(this.lastestPath);
        const data = await response.data;
        this.lastestList = await data;
    }

    handleCurrentMusic(song: MusicData) {
        const findDuplicated = this.playList.find(list => list.id === song.id) // find 메서드로 같은 id를 가진 노래를 찾아서 리턴
            if (findDuplicated === undefined) { // 리턴받은것이 없으면 중복되는 노래가 없다는 의미이므로 바로 push
                this.currentMusic = song;
                this.playList.push(song);
            } else {
                return; // 이미 있는곡인데, 그래도 추가할거냐는 질문을 한뒤, yes / no 로 핸들링 추후에 추가하기.
            }
    }

    handlePlay(song: MusicData) {
        this.currentMusic = song;
    }

    handleDelete(song: MusicData) {
        this.playList.splice(this.playList.indexOf(song), 1); // indexOf 로 song 조건에 맞는 첫번쨰 인덱스를 리턴받아, splice로 그 인덱스만 삭제처리한다.
    }
};

const musicStore = new MusicStore();
export default musicStore;