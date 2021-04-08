import {keyframes} from 'styled-components';

export const slideDown = keyframes`
    from {
        opacity: 0.1;
        top: 50px;
    }
    to {
        opacoty: 1;
        top: 130px;
    }
`;

export const slideUp = keyframes`
    from {
        opacity: 1;
        top: 130px;
    }
    to {
        opacity: 0;
        top: 50px;
    }
`;