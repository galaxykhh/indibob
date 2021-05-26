import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeMute, faVolumeUp } from '@fortawesome/free-solid-svg-icons';

interface IVolumeController {
    isMute: boolean;
    handleMute: () => void;
    totalVolume: React.RefObject<HTMLDivElement>;
    handleVolume: (e: React.MouseEvent) => void;
    currentVolumePercent: number;
}

const VolumeController: React.FC<IVolumeController>= ({ isMute, handleMute, totalVolume, handleVolume, currentVolumePercent }) => {
    return (
    <Container>
            <VolumeIconBox>
                <VolumeIcon icon={isMute ? faVolumeMute : faVolumeUp}
                    onClick={handleMute}
                />
            </VolumeIconBox>
        <VolumeBar ref={totalVolume}
            onClick={handleVolume}
        >
            <VolumeHandler style={{
                    height: '100%',
                    background: `linear-gradient(to right,
                        rgb(255, 255, 255) ${currentVolumePercent}%,
                        rgba(255, 255, 255, .5) ${currentVolumePercent}% 100%)`,
                }}
            />
        </VolumeBar>
    </Container>
    );
};

export default VolumeController;

const Container = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 20%;
    height: 100px;
    @media only screen and (max-width: 630px) {
        justify-content: flex-end;
        width: 30px;
    }
`;

const VolumeIconBox = styled.div`
    width: 45px;
    height: 45px;
`;

const VolumeIcon = styled(FontAwesomeIcon)`
    color: white;
    font-size: 23px;
    width: 45px;
    height: 45px;
    cursor: pointer;
`;

const VolumeBar = styled.div`
    width: 90px;
    height: 5px;
    overflow: hidden;
    cursor: pointer;
    transition: .2s ease;
    transition-delay: .6s;
    &:hover {
        height: 10px;
    }
    @media only screen and (max-width: 630px) {
        display: none;
    }
`;

const VolumeHandler = styled.div`
`;
