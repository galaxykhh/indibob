import { action, makeObservable, observable, runInAction } from 'mobx';
import musicRepository from '../repository/musicRepository';
import { HOT10, LASTEST10 } from '../config';
import authStore from './authStore';

export interface MusicData {
    id: string;
    songTitle: string;
    artist: string;
    image: string;
    bob?: number;
    src: string;
};

interface SelectedData extends MusicData {
    albumTitle: string;
    date: number;
};

class MusicStore {
    public trackAvailable: boolean = false;
    public playList: MusicData[] = [];
    public trackIndex: number = 0;
    public searchResult: MusicData[] = [];
    public hotList: MusicData[] | '' = ''; // Array.isArray(array) ?... => 데이터를 받아오지 못했을 때 '' 로 초기화 시켜주어 스피너 활성화
    public lastestList: MusicData[] | '' = '';
    public selectedTrack: SelectedData = {id: '', albumTitle: '', songTitle: '', artist: '', image: '', bob: 0, date: 0, src: ''};
    public selectedArtist: SelectedData[] = [];
    public duration: number | undefined = undefined;
    public currentTime: number | undefined = undefined;
    public volume: number | undefined = undefined;

    constructor() {
        makeObservable(this, {
            trackAvailable: observable,
            playList: observable,
            trackIndex: observable,
            searchResult: observable,
            hotList: observable,
            lastestList: observable,
            selectedTrack: observable,
            selectedArtist: observable,
            duration: observable,
            currentTime: observable,
            volume: observable,
            setTrackAvailable: action,
            setTrackIndex: action,
            setSearchResult: action,
            setHotList: action,
            setLastestList: action,
            setSelectedTrack: action,
            setSelectedArtist: action,
            setDuration: action,
            setCurrentTime: action,
            setVolume: action,
            handleCurrentTime: action,
            getHotList: action,
            getLastestList: action,
            getSelectedTrackInfo: action,
            getSelectedArtistInfo: action,
            getSearchResult: action,
            handleTrackAvailable: action.bound,
            handleCurrentMusic: action,
            handleAddTrack: action,
            handlePlayPause: action,
            handleDelete: action,
            playPrev: action,
            playNext: action,
        });
    };

    public setTrackAvailable(boolean: boolean): void {
        this.trackAvailable = boolean;
    };

    public setTrackIndex(number: number): void {
        this.trackIndex = number;
    };

    public setHotList(data: MusicData[]): void {
        this.hotList = data;
    };

    public setLastestList(data: MusicData[]): void {
        this.lastestList = data;
    };

    public setSelectedTrack(data: SelectedData): void {
        this.selectedTrack = data;
    };

    public setSelectedArtist(data: SelectedData[]): void {
        this.selectedArtist = data;
    };

    public setSearchResult(data: MusicData[]): void {
        this.searchResult = data;
    };

    public setDuration(duration: number | undefined): void {
        if (authStore.user === null) {
            this.duration = 60;
        } else {
            this.duration = duration;
        };
    };

    public setCurrentTime(currentTime: number | undefined): void {
        this.currentTime = currentTime;
    };

    public setVolume(volume: number | undefined): void {
        this.volume = volume;
    };

    public handleCurrentTime(isRandom: boolean, currentTime: number | undefined): void {
        if (authStore.user === null && currentTime! >= 60) {
            this.playNext(isRandom);
        } else {
            this.setCurrentTime(currentTime);
        };
    };
    // Hot10 곡 리스트를 서버에서 가져온다 [HotTen]
    public async getHotList(): Promise<void> {
        const { data } = await musicRepository.getData(HOT10);
        runInAction(() => {
            this.setHotList(data);
        });
    };
    // Lastest10 곡 리스트를 서버에서 받아온다 [NewIndie]
    public async getLastestList(): Promise<void> {
        const { data } = await musicRepository.getData(LASTEST10);
        runInAction(() => {
            this.setLastestList(data);
        });
    };
    // 내가 클릭한 노래의 정보를 서버에서 받아온다. [SongInfo]
    public async getSelectedTrackInfo(parameter: string): Promise<void> {
        const { data } = await musicRepository.findTrack(parameter);
        runInAction(() => {
            this.setSelectedTrack(data);
        });
    };
    // 클릭한 아티스트의 곡 목록을 받아온다. [ArtistInfo]
    public async getSelectedArtistInfo(parameter: string): Promise<void> {
        const { data } = await musicRepository.fintArtist(parameter);
        runInAction(() => {
            this.setSelectedArtist(data);
        });
    };
    // 검색어가 포함되는 노래 정보를 서버에서 받아온다 [Header, ResultItem]
    public async getSearchResult(parameter: string): Promise<void> {
        const replacedWord =  parameter.replace(/ /g,'');
        const { data } = await musicRepository.searchTrack(replacedWord);
        runInAction(() => {
            this.setSearchResult(data);
        });
    };

    public handleTrackAvailable(): void {
        this.trackAvailable = !this.trackAvailable;
    };
    // 재생버튼을 누른 트랙을 재색목록 추가, 재생하고, 이미 리스트에 있을경우 재생만
    public handleCurrentMusic(song: MusicData) { // cb1 : usePlayer.
        const duplicated = this.playList.find(list => list.id === song.id) // find 메서드로 같은 id를 가진 노래를 찾아서 리턴

            if (duplicated === undefined) { // 리턴받은것이 없으면 중복되는 노래가 없다는 의미이므로 바로 재생 후 push
                this.setTrackAvailable(true);
                this.playList.push(song);
                this.setTrackIndex(this.playList.length - 1);
            } else if (duplicated) {
                const index = this.playList.indexOf(duplicated);
                this.setTrackAvailable(true);
                this.setTrackIndex(index);
            };
    };
    // 재생목록에 선택 곡 추가 [Top]
    public handleAddTrack(song: MusicData, showModal: () => void) {
        const duplicated= this.playList.find(list => list.id === song.id);
        if (duplicated === undefined) {
            this.playList.push(song);
        } else if(duplicated) {
            showModal();
        };
    };

    public handlePlayPause(handleAudio: () => void): void {
        if (this.playList.length === 0) {
            return;
        };
        if (this.trackAvailable) {
            this.setTrackAvailable(false);
            handleAudio();
        } else {
            this.setTrackAvailable(true);
            handleAudio();
        };
    };
    // 재생목록 선택 곡 삭제 [ListItem] --- 재생중인 곡이 바뀌지 않게 인덱스 핸들링
    public handleDelete(song: MusicData, reset: () => void) {
        const index = this.playList.indexOf(song);
        if (index > this.trackIndex){
            this.playList.splice(this.playList.indexOf(song), 1);
        } else if (index < this.trackIndex) {
            this.playList.splice(this.playList.indexOf(song), 1);
            this.setTrackIndex(this.trackIndex - 1);
        } else if (index === this.trackIndex) { // 마지막 한 곡까지 완전히 삭제할 경우에, 모든 음악을 종료한다.
            this.playList.splice(this.playList.indexOf(song), 1);
            reset();
        };
    };
    // 앞곡으로 변경
    public playPrev(isRandom: boolean) {
        const randomNumber = Math.floor(Math.random() * this.playList?.length);
        if (isRandom === false) {
            if (this.trackIndex - 1 < 0) { // 맨 첫곡에서 누르면 마지막 곡 재생
                this.setTrackIndex(this.playList.length - 1);
            } else {
                this.setTrackIndex(this.trackIndex - 1);
            }
        } else if (this.playList?.length === 1) {
            return;
        } else if (randomNumber === this.trackIndex) {
            const lastTrackIndex = this.playList.length - 1;
            this.setTrackIndex(randomNumber + 1 > lastTrackIndex ? randomNumber - 1 : randomNumber + 1); // 
        } else {
            this.setTrackIndex(randomNumber);
        };
    };
    // 뒷곡으로 변경
    public playNext(isRandom: boolean) {
        const randomNumber = Math.floor(Math.random() * this.playList?.length);
        if (isRandom === false) {
            if (this.trackIndex + 1 >= this.playList.length) {
                this.setTrackIndex(0);
            } else {
                this.setTrackIndex(this.trackIndex + 1);
            };
        } else if (this.playList?.length === 1) {
        } else if (randomNumber === this.trackIndex) {
            const lastTrackIndex = this.playList.length - 1;
            this.setTrackIndex(randomNumber + 1 > lastTrackIndex ? randomNumber - 1 : randomNumber + 1);
        } else {
            this.setTrackIndex(randomNumber);
        };
    };

    // playPrev, handleNext를 usePlayer 내부 함수로 사용하지 않는 이유는
    // musicStore의 변수를 사용하지 않는 기본적인 정지, 다시 재생하는 기능은 usePlayer에서 관리를 하고,
    // 변수를 사용하여 핸들링 해주는 기능은 musicStore 내부 메소드로 적어둠.
};

const musicStore = new MusicStore();
export default musicStore;