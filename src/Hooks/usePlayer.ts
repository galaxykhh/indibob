import { useState, useRef } from 'react';
import moment from 'moment';
import 'moment-duration-format';
import { MusicData } from '../stores/musicStore';

export const usePlayer = () => {
    const audio = useRef<HTMLAudioElement>(null);
    const totalProgress = useRef<HTMLDivElement>(null);
    const progressHandler = useRef<HTMLDivElement>(null);
    const totalVolume = useRef<HTMLDivElement>(null);
    const volumeHandler = useRef<HTMLDivElement>(null);
    const isFirstRun = useRef<boolean>(true);
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

    const handleAutoPlay = (trackAvailable: boolean) => { // 첫번쨰 컴포넌트 마운트를 스킵한다
        if (isFirstRun.current) {
            isFirstRun.current = false;
            return;
        }
        if (trackAvailable === false) { // 
            audio.current?.pause();
        } else {
            setIsPlay(true);
            setTimeout(() => audio.current?.play(), 100); // 최소 재생가능한 오디오 데이터 받아오는 시간을 고려.. * oncanplay
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
        if (isMute && audio.current) {
            setIsMute(!isMute);
            audio.current.volume = 1;

        } else if (!isMute && audio.current) {
            setIsMute(!isMute);
            audio.current.volume = 0;
        }
    }

    const handleProgress = (e: React.MouseEvent) => {
        if (duration && totalProgress.current && audio.current){
            const totalWidth = totalProgress.current.offsetWidth;
            const clickPosition = e.pageX;

            audio.current.currentTime = (clickPosition / totalWidth) * audio.current.duration;
        } else {
            return;
        }
    }

    const handleVolume = (e: React.MouseEvent) => {
        if (totalVolume.current && audio.current) { // Progress와 달리 화면 중간에 위치해있기 때문에 클릭지점을 left 거리만큼 계산해야된다. 구글참고
            const clickedPositionInPage = e.pageX;
            const progressStart = totalVolume.current.getBoundingClientRect().left + window.scrollX;
            const progressWidth = totalVolume.current.offsetWidth
            const clickedPositionInBar = clickedPositionInPage - progressStart;
            const volume = (clickedPositionInBar / progressWidth);
            audio.current.volume = volume;
            setVolume(volume);
            return volume;
        }
    }

    return {
        audio,
        totalProgress,
        progressHandler,
        totalVolume,
        volumeHandler,
        volume,
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
    };
}