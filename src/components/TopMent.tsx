import React from 'react';
import styled from 'styled-components';
import { crossUp, crossDown } from './style/Slide';
const src = '/Image/background.jpg';

const TopMent: React.FC = () => {
    return (
        <BGContainer>
            <IMG src={src} />
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
    margin-left: ${props => props.ml};
    font-size: 35px;
    color: #e8eaf0;
    letter-spacing: 5px;
    font-weight: bolder;
    animation: ${props => props.animation} 1s ease forwards;
`;

const BGContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: 186px;
    @media only screen and (max-width: 850px) {
        flex-direction: column;
    }
`;

const IMG = styled.div<Prop>`
    position: absolute;
    top: 100px;
    left: 0;
    width: 100%;
    height: 186px;
    background: linear-gradient(
      to bottom,
      rgba(20, 20, 20, 0.3) 1%,
      rgba(20, 20, 20, 0.6) 30%,
      rgba(20, 20, 20, 0.9) 100%
    ), url(${props => props.src});
    background-size: cover;
    z-index: -1;
`;