import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useState, useRef } from 'react';

export const useSearch = () => {
    const [animation, setAnimation] = useState<boolean>(true);
    const [display, setDisplay] = useState<string>('none');
    const searchInput = useRef<HTMLInputElement>(null);
    const [toggleBtn, setToggleBtn] = useState<any>(faSearch);

    const toggleSearchBtn = () => {
        if (toggleBtn === faSearch) {
        setAnimation(!animation);
        setToggleBtn(faTimes);
        setTimeout(() => searchInput.current?.focus(), 400);
        } else {
            setAnimation(!animation);
            setToggleBtn(faSearch);
        }
    }
    const handleSearchBox = () => {
        if (display === 'none') {
            setDisplay('block');
            toggleSearchBtn();
        } else {
            toggleSearchBtn();
        }
    }
    return { animation , handleSearchBox, searchInput, display, toggleBtn };
};