import { action, makeObservable, observable, flow } from 'mobx';
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
    public latestList: MusicData[] | '' = '';
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
            latestList: observable,
            selectedTrack: observable,
            selectedArtist: observable,
            duration: observable,
            currentTime: observable,
            volume: observable,
            setTrackAvailable: action,
            setTrackIndex: action,
            setSearchResult: action,
            setHotList: action,
            setLatestList: action,
            setSelectedTrack: action,
            setSelectedArtist: action,
            setDuration: action,
            setCurrentTime: action,
            setVolume: action,
            timeValidator: action.bound,
            getHotList: flow,
            getLatestList: flow,
            getSelectedTrackInfo: flow,
            getSelectedArtistInfo: flow,
            getSearchResult: flow,
            handleTrackAvailable: action.bound,
            handleCurrentMusic: action,
            handleAddTrack: action,
            handlePlayPause: action,
            handleDelete: action,
            playPrev: action,
            playNext: action.bound,
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

    public setLatestList(data: MusicData[]): void {
        this.latestList = data;
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

    public timeValidator(currentTime: number | undefined): boolean | void {
        if (!authStore.user && currentTime! >= 60 && this.playList.length === 1) {
            return false;
        } ;
        if (!authStore.user && currentTime! >= 60 && this.playList.length > 1) {
            return true;
        };
        this.setCurrentTime(currentTime);
    };
    // Hot10 곡 리스트를 서버에서 받아온다 [HotTen]
    public *getHotList() {
        const { data } = yield musicRepository.getData(HOT10);
        this.setHotList(data);
    };
    // Latest10 곡 리스트를 서버에서 받아온다 [NewIndie]
    public *getLatestList() {
        const { data } = yield musicRepository.getData(LASTEST10);
        this.setLatestList(data);
    };
    // 내가 클릭한 노래의 정보를 서버에서 받아온다. [SongInfo]
    public *getSelectedTrackInfo(parameter: string) {
        const { data } = yield musicRepository.findTrack(parameter);
        this.setSelectedTrack(data);
    };
    // 클릭한 아티스트의 곡 목록을 받아온다. [ArtistInfo]
    public *getSelectedArtistInfo(parameter: string) {
        const { data } = yield musicRepository.findArtist(parameter);
        this.setSelectedArtist(data);
    };
    // 검색어가 포함되는 노래 정보를 서버에서 받아온다 [Header, ResultItem]
    public *getSearchResult(parameter: string) {
        const replacedWord =  parameter.replace(/ /g,'');
        const { data } = yield musicRepository.searchTrack(replacedWord);
        this.setSearchResult(data);
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

    public handlePlayPause(currentTime: number | undefined): boolean | void {
        if (!authStore.user && currentTime! >= 60) {
            return;
        };
        if (this.playList.length === 0) {
            this.setTrackAvailable(false);
        };
        if (this.trackAvailable) {
            this.setTrackAvailable(false);
            return false;
        } else {
            this.setTrackAvailable(true);
            return true;
        };
    };
    // 재생목록 선택 곡 삭제 [ListItem] --- 재생중인 곡이 바뀌지 않게 인덱스 핸들링
    public handleDelete(song: MusicData): void {
        const index = this.playList.findIndex(songs => songs.id === song.id);
        if (index > this.trackIndex){
            this.playList.splice(index, 1);
        } else if (index < this.trackIndex) {
            this.playList.splice(index, 1);
            this.setTrackIndex(this.trackIndex - 1);
        } else if (index === this.trackIndex) {
            this.playList.splice(index, 1);
            this.setTrackAvailable(false);
        };
    };
    // 앞곡으로 변경
    public playPrev(isRandom: boolean): void {
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
    public playNext(isRandom: boolean): void {
        const randomNumber = Math.floor(Math.random() * this.playList?.length);
        if (isRandom === false) {
            if (this.trackIndex + 1 >= this.playList.length) {
                this.setTrackIndex(0);
            } else {
                this.setTrackIndex(this.trackIndex + 1);
            };
        } else if (this.playList.length === 1) {
            this.setTrackAvailable(false);
        } else if (randomNumber === this.trackIndex) {
            const lastTrackIndex = this.playList.length - 1;
            this.setTrackIndex(randomNumber + 1 > lastTrackIndex ? randomNumber - 1 : randomNumber + 1);
        } else {
            this.setTrackIndex(randomNumber);
        };
    };
};

const musicStore = new MusicStore();
export default musicStore;