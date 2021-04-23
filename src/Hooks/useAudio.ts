import { useState, useRef } from 'react';

export const useAudio = () => {
    const audio = useRef<HTMLAudioElement>(null);
    const totalTime = useRef<HTMLDivElement>(null);
    const currentTime = useRef<HTMLDivElement>(null);
    const isFirstRun = useRef<boolean>(true);
    const [isPlay, setIsPlay] = useState<boolean>(false);
    const [isMute, setIsMute] = useState<boolean>(false);
    const [index, setIndex] = useState<number>(0);

    const handlePlayPause = () => {
        if (isPlay) {
            setIsPlay(!isPlay);
            audio.current?.pause();
        } else {
            setIsPlay(!isPlay);
            audio.current?.play();
        }
    }

    const handleAutoPlay = () => { // 첫번쨰 컴포넌트 마운트를 스킵한다
        if (isFirstRun.current) {
            isFirstRun.current = false;
            return ;
        }
        setIsPlay(true);
        audio.current?.play();
    }

    const handleMute = () => {
        if (isMute && audio.current) {
            setIsMute(!isMute);
            audio.current.volume = 0.01;

        } else if (!isMute && audio.current){
            setIsMute(!isMute);
            audio.current.volume = 0;
        }
    }

    return {
        audio,
        totalTime,
        currentTime,
        isPlay,
        isMute,
        index,
        handlePlayPause,
        handleAutoPlay,
        handleMute,
        setIndex,
    };
}