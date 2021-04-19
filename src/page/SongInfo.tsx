import React from 'react';
import styled from 'styled-components';
import Top from '../components/SongInfo/Top';

const SongInfo: React.FC = () => {
    return (
        <Flex>
            <Top />
        </Flex>
    );
};

export default SongInfo;

const Flex = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;