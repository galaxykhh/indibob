import {keyframes} from 'styled-components';

export const slideDown = keyframes`
    from {
        opacity: 0;
        top: -200px;
    }
    to {
        opacity: 1;
        top: 80px;
    }
`;

export const slideUp = keyframes`
    from {
        opacity: 1;
        top: 80px;
    }
    to {
        opacity: 0;
        top: -200px;
    }
`;

export const tabOpen = keyframes`
    from {
        right: -700px;
    }
    to {
        right: 0px;
    }
`;

export const tabClose = keyframes`
    from {
        right: 0px;
    }
    to {
        right: -700px;

    }
`;