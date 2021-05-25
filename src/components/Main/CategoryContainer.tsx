import React from 'react';
import styled from 'styled-components';

interface ICategory {
    to: string;
    category: string;
};

const CategoryContainer: React.FC<ICategory> = ({ category, children }) => {
    return (
        <Flex>
            <Container>
                <Category>{category}</Category>
                {children}
            </Container>
        </Flex>
    );
};
export default CategoryContainer;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    border-bottom: 1px solid #696666;
    padding-bottom: 80px;
    margin-bottom: 80px;
`;

const Flex = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Category = styled.div`
    color: #ffffff;
    font-size: 24px;
    margin-bottom: 20px;
`;