import { AxiosResponse } from 'axios';
import { action, makeObservable, observable, runInAction } from 'mobx';
import musicRepository from '../Repository/musicRepository';

export interface MusicData {
    id: string;
    songTitle: string;
    artist: string;
    image: string;
    bob: number;
    src: string;
}

interface SelectedMusicData extends MusicData {
    albumTitle: string;
    date: number;
}

class MusicStore {
    trackAvailable: boolean = false;
    playList: MusicData[] = [];
    trackIndex: number = 0;
    hotList: MusicData[] | '' = ''; // Array.isArray(array) ?... => 데이터를 받아오지 못했을 때 '' 로 초기화 시켜주어 스피너 활성화
    lastestList: MusicData[] | '' = '';
    selectedTrack: SelectedMusicData = {id: '', albumTitle: '', songTitle: '', artist: '', image: '', bob: 0, date: 0, src: ''};
    constructor() {
        makeObservable(this, {
            trackAvailable: observable,
            playList: observable,
            trackIndex: observable,
            hotList: observable,
            lastestList: observable,
            selectedTrack: observable,
            getHotList: action,
            getLastestList: action,
            getSelectedTrackInfo: action,
            handleTrackAvailable: action.bound,
            handleCurrentMusic: action.bound,
            handleAddTrack: action.bound,
            handleDelete: action.bound,
            handlePrev: action.bound,
            handleNext: action.bound,
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
        const response: AxiosResponse = await musicRepository.getData('/lastest10');
        runInAction(() => {
        const data = response.data;
        this.lastestList = data;
        });
    };
    // 내가 클릭한 노래의 정보를 서버에서 받아온다. [SongInfo]
    async getSelectedTrackInfo(parameter: string) {
        const track = { id: parameter }; // 곡 비교를 위해 곡의 고유 id를 담아서 전송
        const response: AxiosResponse = await musicRepository.findTrack('/findtrack', track); // findTrack = axios.post
        runInAction(() => {
            const data = response.data;
            this.selectedTrack = data;
        });
    };
    // 오디오 재생이 가능하게, 또는 가능하지 않게
    handleTrackAvailable() {
        this.trackAvailable = !this.trackAvailable;
    }
    // 재생버튼을 누른 트랙을 재색목록 추가, 재생하고, 이미 리스트에 있을경우 재생만
    handleCurrentMusic(song: MusicData) { // cb1 : usePlayer.
        const duplicated = this.playList.find(list => list.id === song.id) // find 메서드로 같은 id를 가진 노래를 찾아서 리턴

            if (duplicated === undefined) { // 리턴받은것이 없으면 중복되는 노래가 없다는 의미이므로 바로 재생 후 push
                this.trackAvailable = true;
                this.playList.push(song);
                this.trackIndex = this.playList.length - 1
            } else if (duplicated) {
                const index = this.playList.indexOf(duplicated)
                this.trackAvailable = true;
                this.trackIndex = index;
            }
    };
    // 재생목록에 선택 곡 추가 [Top]
    handleAddTrack(song: MusicData, showModal: () => void) {
        const duplicated= this.playList.find(list => list.id === song.id);
        if (duplicated === undefined) {
            this.playList.push(song);
        } else if(duplicated) {
            showModal();
        };
    };
    // 재생목록 선택 곡 삭제 [ListItem] --- 재생중인 곡이 바뀌지 않게 인덱스 핸들링
    handleDelete(song: MusicData) {
        const index = this.playList.indexOf(song);
        if (index > this.trackIndex){
            this.playList.splice(this.playList.indexOf(song), 1);
        } else if (index < this.trackIndex) {
            this.playList.splice(this.playList.indexOf(song), 1);
            this.trackIndex = this.trackIndex - 1;
        }
    };
    // 앞곡으로 변경
    handlePrev(isRandom: boolean) {
        const randomNumber = Math.floor(Math.random() * this.playList?.length)
        if (isRandom === false) {
            if (this.trackIndex - 1 < 0) { // 맨 첫곡에서 누르면 마지막 곡 재생
                this.trackIndex = this.playList.length - 1;
            } else {
                this.trackIndex = this.trackIndex - 1;
            }
        } else if (this.playList?.length === 1) {
            return;
        } else if (randomNumber === this.trackIndex) {
            const lastTrackIndex = this.playList.length - 1;
            this.trackIndex = randomNumber + 1 > lastTrackIndex ? randomNumber -1 : randomNumber + 1;
        } else {
            this.trackIndex = randomNumber;
        }
    }
    // 뒷곡으로 변경
    handleNext(isRandom: boolean) {
        const randomNumber = Math.floor(Math.random() * this.playList?.length)
        if (isRandom === false) {
            if (this.trackIndex + 1 >= this.playList.length) { // 맨 마지막곡에서 누르면 첫곡 재생
                this.trackIndex = 0;
            } else {
                this.trackIndex = this.trackIndex + 1;
            }
        } else if (this.playList?.length === 1) {
            return;
        } else if (randomNumber === this.trackIndex) {
            const lastTrackIndex = this.playList.length - 1;
            this.trackIndex = randomNumber + 1 > lastTrackIndex ? randomNumber -1 : randomNumber + 1;
        } else {
            this.trackIndex = randomNumber;
        }
    }

    // handlePrev, handleNext를 usePlayer 내부 함수로 사용하지 않는 이유는
    // musicStore의 변수를 사용하지 않는 기본적인 정지, 다시 재생하는 기능은 usePlayer에서 관리를 하고,
    // 변수를 사용하여 핸들링 해주는 기능은 musicStore 내부 메소드로 적어둠.
};

const musicStore = new MusicStore();
export default musicStore;