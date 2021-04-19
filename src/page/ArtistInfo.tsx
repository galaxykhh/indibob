import React from 'react';
import styled from 'styled-components';

const ArtistInfo: React.FC = () => {
    return (
        <Container>
            <Test>
                asdasd
            </Test>
        </Container>
    );
};

export default ArtistInfo;

const Container = styled.div`
    display: flex;
    flex-direction: row;
    margin-top: 100px;
    width: 1000px;
    justify-content: flex-start;
    align-items: center;
`;

const Test = styled.div`
    color: white;
`;