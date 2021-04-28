import React from 'react';
import styled from 'styled-components';
import Info from '../components/SongInfo/Info';

const SongInfo: React.FC = () => {
    return (
        <Flex>
            <Info />
        </Flex>
    );
};

export default SongInfo;

const Flex = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;