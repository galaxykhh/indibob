import React from 'react';
import styled from 'styled-components';

interface IErrorMsg {
    color: string;
    visible: string;
    animation: any;
}

const AlertMsg: React.FC<IErrorMsg>= ({children, color, animation, visible}) => {
    return (
        <>
            <Message color={color}
                     animation={animation}
                     visible={visible}
                     >
                {children}
            </Message>
        </>
    )
}

export default AlertMsg;

const Message = styled.div<{color: string, animation: any, visible: string}>`
    color: ${props => props.color};
    animation: ${props => props.animation};
    display: ${props => props.visible};
`;