import { action, makeObservable, observable } from 'mobx';

export interface MusicData {
    songTitle: string;
    artist: string;
    image: string;
}

class MusicStore {
    musicList: MusicData[] = [];
    currentMusic: MusicData = {image: '', songTitle: '', artist: ''};
    isBobClicked: boolean = false;
    constructor() {
        makeObservable(this, {
            musicList: observable,
            currentMusic: observable,
            addSong: action,
            setCurrentMusic: action,
            isBobClicked: observable,
        })
    }
    setCurrentMusic(song: MusicData) {
        this.currentMusic = song;
        console.log(song);
    }

    addSong(song: MusicData) {
        if (song !== this.musicList[0]) {
            this.musicList.push(song);
        }   else {
            return;
        }
    }
}

const musicStore = new MusicStore();
export default musicStore;