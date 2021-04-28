import React from 'react';
import styled from 'styled-components';
import Info from '../components/ArtistInfo/Info';

const ArtistInfo: React.FC = () => {
    return (
        <Flex>
            <Info />
        </Flex>
    );
};

export default ArtistInfo;

const Flex = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Test = styled.div`
    color: white;
`;