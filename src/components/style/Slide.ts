import {keyframes} from 'styled-components';

export const slideDown = keyframes`
    from {
        opacity: 0;
        top: 50px;
    }
    to {
        opacity: 1;
        top: 110px;
    }
`;

export const slideUp = keyframes`
    from {
        opacity: 1;
        top: 110px;
    }
    to {
        opacity: 0;
        top: 50px;
    }
`;

export const crossUp = keyframes`
    from {
        opacity: 0;
        transform: translateY(100px);
    }
    to {
        opacity: 1;
        transform: translateY(0px);
    }
`;

export const crossDown = keyframes`
    from {
        opacity: 0;
        transform: translateY(-80px);
    }
    to {
        opacity: 1;
        transform: translateY(0px);

    }
`;