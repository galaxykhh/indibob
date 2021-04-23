import React from 'react';
import styled from 'styled-components';
import { modalOpen, modalClose } from '../style/keyframes';

interface IModal {
    isopen: boolean
}

const Modal: React.FC<IModal>= ({ children, isopen }) => {
    return (
            <Dialog isopen={isopen}>
                <Flex>
                    {children}
                </Flex>
            </Dialog>
    )
}

export default Modal;

interface BOOLEAN {
    isopen: boolean;
}

const Dialog = styled.div<BOOLEAN>`
    display: ${props => props.isopen ? 'block' : 'none'};
    position: absolute;
    top: 70%;
    left: 50%;
    width: 500px;
    height: 50px;
    margin: -230px;
    background-color: rgba(0, 0, 0, 0.7);
    border-radius: 40px;
    animation: ${props => props.isopen ? modalOpen : modalClose} 2s ease;
`;

const Flex = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 500px;
    height: 45px;
`;

// const BtnBox = styled.div`
//     display: flex;
//     flex-direction: row;
//     margin-top: 40px;
// `;

// const Btn = styled.button`
//     all: unset;
//     padding-left: 10px;
//     padding-right: 10px;
//     width: 65px;
//     height: 44px;
//     border-radius: 15px;
//     color: black;
//     text-align: center;
//     font-size: 19px;
//     margin-right: 10px;
//     background-color: #ffffff;
//     cursor: pointer;
//     transition: all 0.2s ease;
//     &:hover {
//         color: white;
//         background-color: #f1404b; 
//     }
// `;

