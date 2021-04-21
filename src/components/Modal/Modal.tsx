import React from 'react';
import styled from 'styled-components';
import { modalOpen, modalClose } from '../style/keyframes';

interface IModal {
    addtrack: any
    cancel: any
    isopen: boolean
}

const Modal: React.FC<IModal>= ({ children, addtrack, cancel, isopen }) => {
    return (
        <Overlay isopen={isopen} >
            <Dialog isopen={isopen}>
                <Flex>
                    {children}
                    <BtnBox>
                        <Btn onClick={addtrack} > Add </Btn>
                        <Btn onClick={cancel} > Cancel </Btn>
                    </BtnBox>
                </Flex>
            </Dialog>
        </Overlay>
    )
}

export default Modal;

interface BOOLEAN {
    isopen: boolean;
}

const Overlay = styled.div<BOOLEAN>`
    display: ${props => props.isopen ? 'block' : 'none'};
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
`;

const Dialog = styled.div<BOOLEAN>`
    position: absolute;
    top: 50%;
    left: 50%;
    width: 500px;
    height: 250px;
    margin: -250px;
    background-color: rgba(0, 0, 0, 0.9);
    border-radius: 40px;
    animation: ${props => props.isopen ? modalOpen : modalClose} 0.4s ease forwards;
`;

const Flex = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 500px;
    height: 250px;
`;

const BtnBox = styled.div`
    display: flex;
    flex-direction: row;
    margin-top: 40px;
`;

const Btn = styled.button`
    all: unset;
    padding-left: 10px;
    padding-right: 10px;
    width: 65px;
    height: 44px;
    border-radius: 15px;
    color: black;
    text-align: center;
    font-size: 19px;
    margin-right: 10px;
    background-color: #ffffff;
    cursor: pointer;
    transition: all 0.2s ease;
    &:hover {
        color: white;
        background-color: #f1404b; 
    }
`;

