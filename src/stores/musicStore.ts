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
            addSong: action,
            setCurrentMusic: action,
            setIsTabOpen: action,
        })
    }
    setCurrentMusic(song: MusicData) {
        this.currentMusic = song;
        this.musicList.push(song);
    }

    addSong(song: MusicData) {
        if (song !== this.musicList[0]) {
            this.musicList.push(song);
        }   else {
            return;
        }
    }

    setIsTabOpen() {
        this.isTabOpen = !this.isTabOpen;
    }
}

const musicStore = new MusicStore();
export default musicStore;