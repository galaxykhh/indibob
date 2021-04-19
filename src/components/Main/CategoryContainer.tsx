import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

interface CateProp {
    to: string;
    category: string;
}

const CategoryContainer: React.FC<CateProp> = (props) => {
    return (
        <Flex>
            <Container>
                <Category to={props.to}> {props.category} </Category>
                {props.children}
            </Container>
        </Flex>
    );
}
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

const Category = styled(NavLink).attrs(props => ({
    to: props.to
}))`
    text-decoration: none;
    color: #ffffff;
    font-size: 24px;
    margin-bottom: 20px;
`;