import {keyframes} from 'styled-components';

export const slideDown = keyframes`
    from {
        opacity: 0;
        top: 60px;
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
        top: 60px;
    }
`;

export const PcrossUp = keyframes`
    from {
        opacity: 0;
        bottom: -110px;
    }
    to {
        opacity: 1;
        bottom: 0px;
    }
`;

export const PcrossDown = keyframes`
    from {
        opacity: 1;
        bottom: 0px;
    }
    to {
        opacity: 0;
        bottom: -110px;

    }
`;