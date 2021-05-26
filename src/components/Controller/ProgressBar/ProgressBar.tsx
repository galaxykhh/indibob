import React from "react";
import styled from "styled-components";

interface IProgressBar {
    totalProgress: React.RefObject<HTMLDivElement>;
    progressHandler: React.RefObject<HTMLDivElement>;
    handleProgress: (e: React.MouseEvent) => void;
    currentProgressPercent: number;
};

const ProgressBar: React.FC<IProgressBar>= ({ totalProgress, progressHandler, handleProgress, currentProgressPercent }) => {
    return (
        <Container ref={totalProgress}>
            <ProgressHandler
                ref={progressHandler} // MDN: linear-gradient 그라데이션 없이 구분선을 정해주어, 퍼센트값을 넣어준다.
                onMouseDown={handleProgress}
                style={{ 
                    height: '100%',
                    background: `linear-gradient(to right,
                        rgb(192, 56, 56) ${currentProgressPercent}%,
                        rgba(192, 56, 56, .5) ${currentProgressPercent}% 100%)`,
                }}
            />
        </Container>
    );
};

export default ProgressBar;

const Container = styled.div`
    position: fixed;
    bottom: 110px;
    width: 100%;
    height: 6px;
    overflow: hidden;
    cursor: pointer;
    transition: height .2s ease;
    z-index: 10000;
    &:hover {
        height: 15px;
    }
    @media only screen and (max-width: 850px) {
        position: fixed;
        left: 0;
        bottom: 164px;
    }
`;

const ProgressHandler = styled.div`
`;