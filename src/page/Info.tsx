import React from 'react';
import styled from 'styled-components';

const Info: React.FC = () => {
    return (
        <Flex>
            <Box> asdasd </Box>
        </Flex>
    );
};

export default Info;

const Flex = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Box = styled.div`
    margin-top: 160px;
    color: white;
`;