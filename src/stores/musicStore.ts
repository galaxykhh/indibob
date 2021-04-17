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
            setCurrentMusic: action,
            playThis: action,
        })
    }

    setCurrentMusic(song: MusicData) {
        const findDuplicated = this.musicList.find(list => list.id === song.id)
            if (findDuplicated === undefined) {
                this.currentMusic = song;
                this.musicList.push(song);
            } else {
                return; // 이미 있는곡인데, 그래도 추가할거냐는 질문을 한뒤, yes / no 로 핸들링 추후에 추가하기.
            }
    }

    playThis(song: MusicData) {
        this.currentMusic = song;
    }

    deleteThis(song: MusicData) {
        this.musicList.splice(this.musicList.indexOf(song), 1);
    }
};

const musicStore = new MusicStore();
export default musicStore;