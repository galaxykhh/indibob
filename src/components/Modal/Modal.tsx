import React from 'react';
import styled from 'styled-components';
import { modalOpen, modalClose } from '../../style/keyframes';

interface IModal {
    isOpen: boolean
}

const Modal: React.FC<IModal>= ({ children, isOpen }) => {
    return (
        <Form isOpen={isOpen}>
            <Flex>
                <Announce>
                    {children}
                </Announce>
            </Flex>
        </Form>
    );
};

export default Modal;

const Form = styled.div<{ isOpen: boolean }>`
    display: ${({ isOpen }) => isOpen ? 'block' : 'none'};
    position: fixed;
    top: 50%;
    left: 50%;
    width: 500px;
    height: 50px;
    margin: -250px;
    background-color: rgba(0, 0, 0, 0.7);
    border-radius: 40px;
    animation: ${({ isOpen }) => isOpen ? modalOpen : modalClose} 1.5s ease;
`;

const Flex = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 500px;
    height: 50px;
`;

const Announce = styled.div`
    color: white;
    font-size: 18px;
    text-align: center;
    margin-top: 3px;
`;

