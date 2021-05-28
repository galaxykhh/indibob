import React from 'react';
import styled from 'styled-components';
import { MusicData } from '../../../stores/musicStore';

interface ITimeViewer {
    currentTime: string;
    duration: string;
    playList: MusicData[];
};

const TimeViewer: React.FC<ITimeViewer>= ({ playList, currentTime, duration }) => {
    return (
    <Container>
        <Time>
            {playList.length > 0 && 
            <>
                {currentTime} / {duration}
            </>
            }
        </Time>
    </Container>
    );
};

export default TimeViewer;

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 10%;
    height: 100px;
    @media only screen and (max-width: 630px) {
        justify-content: flex-start;   
    }
`;

const Time = styled.div`
    white-space: nowrap;
    font-size: 15px;
    color: #dbd7d7;
`;
