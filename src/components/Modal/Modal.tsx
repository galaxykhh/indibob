import React from 'react';
import styled from 'styled-components';
import { modalOpen, modalClose } from '../style/keyframes';

interface IModal {
    isopen: boolean
}

const Modal: React.FC<IModal>= ({ children, isopen }) => {
    return (
            <Form isopen={isopen}>
                <Flex>
                    {children}
                </Flex>
            </Form>
    )
}

export default Modal;

interface BOOLEAN {
    isopen: boolean;
}

const Form = styled.div<BOOLEAN>`
    display: ${props => props.isopen ? 'block' : 'none'};
    position: absolute;
    top: 50%;
    left: 50%;
    width: 500px;
    height: 50px;
    margin: -250px;
    background-color: rgba(0, 0, 0, 0.7);
    border-radius: 40px;
    animation: ${props => props.isopen ? modalOpen : modalClose} 1.5s ease;
`;

const Flex = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 500px;
    height: 50px;
`;

