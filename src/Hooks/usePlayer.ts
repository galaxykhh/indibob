import { useState, useRef } from 'react';
import moment from 'moment';
import 'moment-duration-format';

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

    const handleAutoPlay = (trackStarted: boolean) => { // 첫번쨰 컴포넌트 마운트를 스킵한다
        if (isFirstRun.current) {
            isFirstRun.current = false;
            return;
        }
        if (trackStarted === false) {
            audio.current?.pause();
        } else {
            setIsPlay(true);
            audio.current?.play();
        }
    }

    const handlePlayPause = (handler: () => void) => {
        if (isPlay) {
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
        if (duration && handler.current){
            const handlerWidth = handler.current.offsetWidth;
            const clickPosition = e.pageX;
            const timePerPixel = duration / handlerWidth;

            return timePerPixel * clickPosition;
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