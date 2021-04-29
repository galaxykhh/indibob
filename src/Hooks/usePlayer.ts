import { useState, useRef } from 'react';
import moment from 'moment';
import 'moment-duration-format';
import { MusicData } from '../stores/musicStore';

export const usePlayer = () => {
    const audio = useRef<HTMLAudioElement>(null); // 오디오 엘리먼트 ref
    const totalProgress = useRef<HTMLDivElement>(null); 
    const progressHandler = useRef<HTMLDivElement>(null); 
    const totalVolume = useRef<HTMLDivElement>(null);
    const volumeHandler = useRef<HTMLDivElement>(null);
    const isFirstRun = useRef<boolean>(true);
    const [isRandom, setIsRandom] = useState<boolean>(false);
    const [isLoop, setIsLoop] = useState<boolean>(false);
    const [isPlay, setIsPlay] = useState<boolean>(false);
    const [isMute, setIsMute] = useState<boolean>(false);
    const [duration, setDuration] = useState<number>();
    const [currentTime, setCurrentTime] = useState<number>();
    const [volume, setVolume] = useState<number>();
    const currentProgressPercent = (currentTime! / duration!) * 100;
    const currentVolumePercent = (volume!) * 100;

    const formatDuration = (duration: number | undefined) => {
        return moment.duration(duration, 'seconds').format('mm:ss', { trim: false });
    }

    const setAudioData = () => {
        setDuration(audio.current?.duration);
        setCurrentTime(audio.current?.currentTime);
    }

    const setAudioTime = () => setCurrentTime(audio.current?.currentTime);

    const setVolumeData = () => {
        setVolume(audio.current?.volume);
    }

    const playBack = () => {
        return audio.current?.play();
    }

    const handleAutoPlay = (trackAvailable: boolean) => {
        if (isFirstRun.current) {
            isFirstRun.current = false; // componentDidMount
            return;
        }
        if (trackAvailable === false) { // 곡을 추가하는 동시에 trackAvailable가 활성화 (musicStore.handleCurrentTrack => handleTrackAvailable)
            audio.current?.pause();
        } else {
            setIsPlay(true); // audio 가 반환하는 audio promise => 재생이 가능한 수준까지 로딩이 되면 트랙을 재생
            playBack()?.then(() => {
            })
            .catch(error => {
            })
        }
    }

    const handlePlayPause = (playList: MusicData[], progressHandler: () => void) => { // progressHandler = musicStore.handleTrackAvailable
        if (playList.length === 0) {
            return
        } else if (isPlay) {
            progressHandler(); 
            setIsPlay(!isPlay);
            audio.current?.pause();
        } else {
            progressHandler();
            setIsPlay(!isPlay);
            audio.current?.play();
        }
    }

    const handleMute = () => { 
        const savedVolume = audio.current?.volume; // 사용자가 지정했던 볼륨
        if (isMute && audio.current) {
            setIsMute(!isMute);
            setVolume(savedVolume);
            audio.current.muted = false;
        } else if (!isMute && audio.current) {
            setIsMute(!isMute);
            setVolume(0);
            audio.current.muted = true;
        }
    }

    const handleRandom = () => {
        setIsRandom(!isRandom);
    }

    const handleLoop = () => {
        setIsLoop(!isLoop);
    }

    const handleProgress = (e: React.MouseEvent) => {
        if (duration && totalProgress.current && audio.current){
            let totalWidth = totalProgress.current.offsetWidth;
            let clickPosition = e?.pageX;
            audio.current.currentTime = (clickPosition! / totalWidth) * audio.current.duration;
        } else {
            return;
        }
    }

    const handleVolume = (e: React.MouseEvent) => {
        if (totalVolume.current && audio.current) { // Progress와 달리 화면 중간에 위치해있기 때문에 클릭지점을 left 거리만큼 계산해야된다. 구글참고
            const clickedPositionInPage = e.pageX;
            const progressStart = totalVolume.current.getBoundingClientRect().left;
            const progressWidth = totalVolume.current.offsetWidth
            const clickedPositionInBar = clickedPositionInPage - progressStart;
            const volume = (clickedPositionInBar / progressWidth);
            audio.current.volume = volume;
            setVolume(volume);
        }
    }

    const handleLoopPlay = () => {
        audio.current!.currentTime = 0;
    }

    return {
        audio,
        totalProgress,
        progressHandler,
        totalVolume,
        volumeHandler,
        volume,
        isRandom,
        isLoop,
        isPlay,
        isMute,
        duration,
        currentTime,
        currentProgressPercent,
        currentVolumePercent,
        formatDuration,
        setAudioData,
        setAudioTime,
        setVolumeData,
        handleAutoPlay,
        handlePlayPause,
        handleMute,
        handleProgress,
        handleVolume,
        handleRandom,
        handleLoop,
        handleLoopPlay,
    };
}