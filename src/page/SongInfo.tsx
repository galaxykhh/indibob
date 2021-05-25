import React from 'react';
import styled from 'styled-components';
import Info from '../components/SongInfo/Info';

const SongInfo: React.FC = () => {

    return (
        <FlexBox>
            <Info />
        </FlexBox>
    );
};

export default SongInfo;

const FlexBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;