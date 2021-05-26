import React from 'react';
import styled from 'styled-components';
import { faAngleDoubleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface ITabHandler {
    handleTab: boolean;
    handleListBar: () => void;
};

const TabHandler: React.FC<ITabHandler>= ({ handleTab, handleListBar }) => {
    return (
        <Container >
            <HandlerWrap $rotate={handleTab} >
                <Handler
                    icon={faAngleDoubleLeft}
                    onClick={handleListBar}
                />
            </HandlerWrap>
        </Container>
    );
};

export default TabHandler;

const Container = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 100px;
    height: 100px;
    @media only screen and (max-width: 630px) {
        width: 30px;   
    }
`;

const HandlerWrap = styled.div<{ $rotate: boolean }>`
    transform: ${props => props.$rotate ? 'rotate(180deg)' : 'rotate(0deg)'};
    transition: 0.4s ease;
    margin-right: 50px;
`;

const Handler = styled(FontAwesomeIcon)`
    all: unset;
    width: 10%;
    font-size: 30px;
    color: white;
    cursor: pointer;
`;