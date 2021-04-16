import React from 'react';
import styled from 'styled-components';
import { tabClose, tabOpen } from '../style/Slide';

interface IListBar {
    handletab: boolean;
    display: string;
}

const ListBar: React.FC<IListBar>= (props) => {
    return (
        <Container handletab={props.handletab} display={props.display} >
            <div style={{color: 'white'}}> asdasd </div>
        </Container>
    )
};
export default ListBar;

const Container = styled.div<{handletab: boolean, display: string}>`
    position: fixed;
    right: 0;
    top: 0;
    display: ${props => props.display};
    width: 430px;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8);
    animation: ${props => props.handletab ? tabOpen : tabClose } .6s ease forwards;
`;