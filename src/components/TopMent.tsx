import React from 'react';
import styled from 'styled-components';
import { crossUp, crossDown } from './style/Slide';
const src = '/Image/background.jpg';

const TopMent: React.FC = () => {
    return (
        <BGContainer>
            <Text animation={crossUp} > Show Your Indie, </Text>
            <Text ml='30px' animation={crossDown} > Let Me Indie </Text>
        </BGContainer>
    )
}
export default TopMent;

interface Prop {
    animation?: any,
    ml?: string
    src?: string;
}

const Text = styled.div<Prop>`
    font-family: 'Kalam', cursive;
    margin-left: ${props => props.ml};
    font-size: 35px;
    color: #e8eaf0;
    letter-spacing: 5px;
    animation: ${props => props.animation} 1s ease forwards;
`;

const BGContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-top: 40px;
    height: 120px;
    @media only screen and (max-width: 850px) {
        flex-direction: column;
    }
`;