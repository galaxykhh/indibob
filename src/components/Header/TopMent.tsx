import React from 'react';
import styled from 'styled-components';

const TopMent: React.FC<{first: string, second: string}> = (props) => {
    return (
        <BGContainer>
            <Text> {props.first} </Text>
            <Text ml='30px' > {props.second} </Text>
        </BGContainer>
    );
};
export default TopMent;

interface Prop {
    ml?: string
    src?: string;
};

const Text = styled.div<Prop>`
    font-family: 'Kalam', cursive;
    margin-left: ${props => props.ml};
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