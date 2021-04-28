import { useState, useRef } from 'react';
import musicStore from '../stores/musicStore';
type DisplayType = 'none' | 'block';

export const useSearch = () => {
    const [animation, setAnimation] = useState<boolean>(true); // 검색 애니메이션 boolean
    const [display, setDisplay] = useState<DisplayType>('none'); // 맨 처음 애니메이션이 작동하는걸 보여주지 않기위해 기본값으로 none 설정
    const [isExist, setIsExist] = useState<boolean>(false);
    const searchInput = useRef<HTMLInputElement>(null); // 검색창 인풋

    const toggleSearchBtn = () => {
        if (animation) { 
        setAnimation(!animation); // 애니메이션을 boolean 트리거
        setTimeout(() => searchInput.current?.focus(), 400); // 애니메이션이 끝날쯤에 인풋에 포커스
        } else {
            setAnimation(!animation);
        }
    }

    const handleSearchBox = () => {
        if (display === 'none') { // 최초 display가 none일 경우에 block으로 설정
            setDisplay('block');
            toggleSearchBtn();
        } else {
            toggleSearchBtn();
            searchInput.current!.value = ''; // 검색창 초기화
            setIsExist(false);
        }
    }

    const handleInput = () => {
        if (searchInput.current) {
            if (searchInput.current?.value.replace(/ /g,'') === '') {
                setIsExist(false);
            } else {
                musicStore.getSearchResult(searchInput.current?.value);
                setIsExist(true);
            }
        }
    }

    return {
        animation,
        searchInput,
        display,
        isExist,
        handleSearchBox,
        handleInput,
    };
};