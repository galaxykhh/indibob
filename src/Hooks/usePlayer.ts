import { useState, useRef } from 'react';
import moment from 'moment';
import 'moment-duration-format';
import { MusicData } from '../stores/musicStore';

export const usePlayer = () => {
    const audio = useRef<HTMLAudioElement>(null);
    const totalTime = useRef<HTMLDivElement>(null);
    const handler = useRef<HTMLDivElement>(null);
    const isFirstRun = useRef<boolean>(true);
    const [isPlay, setIsPlay] = useState<boolean>(false);
    const [isMute, setIsMute] = useState<boolean>(false);
    const [duration, setDuration] = useState<number>();
    const [currentTime, setCurrentTime] = useState<number>();
    const currentPercent = (currentTime! / duration!) * 100;

    const formatDuration = (duration: number | undefined) => {
        return moment.duration(duration, 'seconds').format('mm:ss', { trim: false });
    }

    const setAudioData = () => {
        setDuration(audio.current?.duration);
        setCurrentTime(audio.current?.currentTime);
    }

    const setAudioTime = () => setCurrentTime(audio.current?.currentTime);

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

    const handlePlayPause = (playList: MusicData[], handler: () => void) => { // handler = musicStore.
        if (playList.length === 0) {
            return
        } else if (isPlay) {
            handler(); 
            setIsPlay(!isPlay);
            audio.current?.pause();
        } else {
            handler();
            setIsPlay(!isPlay);
            audio.current?.play();
        }
    }

    const handleMute = () => { // 처음에 곡을
        if (isMute && audio.current) {
            setIsMute(!isMute);
            audio.current.volume = 1;

        } else if (!isMute && audio.current) {
            setIsMute(!isMute);
            audio.current.volume = 0;
        }
    }

    const handleProgress = (e: React.MouseEvent) => {
        if (duration && totalTime.current && audio.current){
            const totalWidth = totalTime.current.offsetWidth;
            const clickPosition = e.pageX;

            audio.current.currentTime = (clickPosition / totalWidth) * audio.current.duration;
        } else {
            return;
        }
    }

    return {
        audio,
        totalTime,
        handler,
        isPlay,
        isMute,
        duration,
        currentTime,
        currentPercent,
        formatDuration,
        setAudioData,
        setAudioTime,
        handleAutoPlay,
        handlePlayPause,
        handleMute,
        handleProgress,
    };
}