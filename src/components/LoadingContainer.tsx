import React from 'react'
import styled from 'styled-components';
import Loader from 'react-loader-spinner';

const LoadingContainer: React.FC = () => {
    return (
        <LoadContainer>
            <Loader type="Oval" color="#f1404b" height={50} width={50} />
        </LoadContainer>
    )
}

export default LoadingContainer;

const LoadContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 1000px;
    height: 350px;
    margin-top: 10px;
`;