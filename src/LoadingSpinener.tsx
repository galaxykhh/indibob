import React from 'react'
import styled from 'styled-components';
import Loader from 'react-loader-spinner';

const LoadingSpinner: React.FC = () => {
    return (
        <LoadContainer>
            <Loader type="Oval" color="#f1404b" height={30} width={30}  />
        </LoadContainer>
    )
}

export default LoadingSpinner;

const LoadContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 1000px;
    height: 350px;
    margin-top: 10px;
`;