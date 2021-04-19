import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useState, useRef } from 'react';

export const useSearch = () => {
    const [animation, setAnimation] = useState<boolean>(true); // 검색 애니메이션 boolean
    const [display, setDisplay] = useState<string>('none'); // 맨 처음 애니메이션이 작동하는걸 보여주지 않기위해 기본값으로 none 설정
    const searchInput = useRef<HTMLInputElement>(null); // 검색버튼을 누르고 포커스를 주기위해 레퍼런스 생성
    const [toggleBtn, setToggleBtn] = useState<any>(faSearch); // 버튼 클릭시 보여줄 아이콘 state => fontAwesome

    const toggleSearchBtn = () => {
        if (toggleBtn === faSearch) { // 검색하기위해 버튼을 누른상태로, faSearch(돋보기)일시
        setAnimation(!animation); // 애니메이션을 boolean 트리거
        setToggleBtn(faTimes); // x 아이콘으로 변경
        setTimeout(() => searchInput.current?.focus(), 400); // 애니메이션이 끝날쯤에 인풋에 포커스
        } else {
            setAnimation(!animation);
            setToggleBtn(faSearch);
        }
    }
    const handleSearchBox = () => {
        if (display === 'none') { // 최초 display가 none일 경우에 block으로 설정
            setDisplay('block');
            toggleSearchBtn();
        } else {
            toggleSearchBtn(); // 그 이후로는 같은 애니메이션 트리거 반복
        }
    }
    return { animation , handleSearchBox, searchInput, display, toggleBtn };
};