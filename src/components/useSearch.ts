import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useState, useRef } from 'react';

export const useSearch = () => {
    const [animation, setAnimation] = useState<boolean>(true);
    const [display, setDisplay] = useState<string>('none');
    const searchInput = useRef<HTMLInputElement>(null);
    const [icon, setIcon] = useState<any>(faSearch);

    const showIt = () => {
        setDisplay('block');
        setAnimation(!animation);
        setTimeout(() => searchInput.current?.focus(), 400);
        setIcon(faTimes);
    }
    const hideIt = () => {
        setTimeout(() => setDisplay('none'), 400);
        setAnimation(!animation);
        setIcon(faSearch);
    }

    const handleSearchBox = () => {
        if (display === 'none') {
            showIt();
        } else {
            hideIt();
        }
    }
    return { animation , handleSearchBox, searchInput, display, icon };
};