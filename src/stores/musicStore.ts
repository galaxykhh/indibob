import { action, makeObservable, observable } from 'mobx';

export interface MusicData {
    id: number;
    songTitle: string;
    artist: string;
    image: string;
}

class MusicStore {
    musicList: MusicData[] = [];
    currentMusic: MusicData = {image: '', songTitle: '', artist: '', id: 0};
    isTabOpen: boolean = false;
    constructor() {
        makeObservable(this, {
            musicList: observable,
            currentMusic: observable,
            isTabOpen: observable,
            handleCurrentMusic: action,
            handlePlay: action,
            handleDelete: action,
        })
    }

    handleCurrentMusic(song: MusicData) {
        const findDuplicated = this.musicList.find(list => list.id === song.id) // find 메서드로 같은 id를 가진 노래를 찾아서 리턴
            if (findDuplicated === undefined) { // 리턴받은것이 없으면 중복되는 노래가 없다는 의미이므로 바로 push
                this.currentMusic = song;
                this.musicList.push(song);
            } else {
                return; // 이미 있는곡인데, 그래도 추가할거냐는 질문을 한뒤, yes / no 로 핸들링 추후에 추가하기.
            }
    }

    handlePlay(song: MusicData) {
        this.currentMusic = song;
    }

    handleDelete(song: MusicData) {
        this.musicList.splice(this.musicList.indexOf(song), 1); // indexOf 로 song 조건에 맞는 첫번쨰 인덱스를 리턴받아, splice로 그 인덱스만 삭제처리한다.
    }
};

const musicStore = new MusicStore();
export default musicStore;