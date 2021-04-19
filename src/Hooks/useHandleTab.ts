import { useState } from 'react';

type DisplayType = 'none' | 'block';

export const useHandleTab = () => {
    const [handleTab, setHandleTab] = useState<any>(+false);
    const [display, setDisplay] = useState<DisplayType>('none');

    const toggleList = () => {
        if (handleTab === +false) {
            setHandleTab(+true);
        } else {
            setHandleTab(+false);
        }
    }

    const handleListBar = () => {
        if (display === 'none') {
            setDisplay('block');
            toggleList();
        } else {
            toggleList();
        };
    };

    return { toggleList, handleListBar, handleTab, display };
}