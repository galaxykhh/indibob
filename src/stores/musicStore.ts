import { action, makeObservable, observable } from 'mobx';

export interface MusicData {
    songTitle: string;
    artist: string;
    image: string;
}

class MusicStore {
    musicList: MusicData[] = [];
    currentMusic: MusicData = {image: '', songTitle: '', artist: ''};
    isTabOpen: boolean = false;
    constructor() {
        makeObservable(this, {
            musicList: observable,
            currentMusic: observable,
            isTabOpen: observable,
            setCurrentMusic: action,
            forcePlay: action,
        })
    }

    setCurrentMusic(song: MusicData) {
        this.currentMusic = song;
        this.musicList.push(song);
    }

    forcePlay(song: MusicData) {
        this.currentMusic = song;
    }
}

const musicStore = new MusicStore();
export default musicStore;