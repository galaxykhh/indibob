import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

interface CateProp {
    to: string;
    category: string;
}

const CategoryBox: React.FC<CateProp> = (props) => {
    return (
        <Center>
            <Container>
                <Category to={props.to}> {props.category} </Category>
                {props.children}
            </Container>
        </Center>
    );
}
export default CategoryBox;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    margin-top: 40px;
`;

const Center = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Category = styled(NavLink).attrs(props => ({
    to: props.to
}))`
    text-decoration: none;
    color: #ffffff;
    font-size: 30px;
    margin-bottom: 20px;
`;