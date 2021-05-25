import React from 'react';
import styled from 'styled-components';

const TopMent: React.FC<{ first: string, second: string }> = ({ first, second }) => {
    return (
        <BGContainer>
            <Text>{first}</Text>
            <Text ml='30px' >{second}</Text>
        </BGContainer>
    );
};
export default TopMent;

const Text = styled.div<{ ml?: string }>`
    font-family: 'Kalam', cursive;
    margin-left: ${({ ml }) => ml};
    font-size: 30px;
    color: #e8eaf0;
    letter-spacing: 5px;
    @media only screen and (max-width: 700px) {
        font-size: 20px;
    };
`;

const BGContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-bottom: 30px;
    height: 120px;
`;