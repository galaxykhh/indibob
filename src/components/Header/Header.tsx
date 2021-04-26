import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { slideUp, slideDown } from '../style/keyframes';
import { useSearch } from '../../Hooks/useSearch';

const Header: React.FC = () => {
    
    const handleSearch = useSearch();

    return (
        <>
            <LogoContainer>
                    <Logo to='/' > INDIEBOB </Logo>
                    <SearchBtnWrap>
                        <SearchBtn onClick={handleSearch.handleSearchBox}
                                   icon={handleSearch.animation ? faSearch : faTimes}
                                   />
                    </SearchBtnWrap>
                    <SearchBox display={handleSearch.display}
                               animation={handleSearch.animation}
                               ref={handleSearch.searchInput}
                               />
            </LogoContainer>
            <RedLine />
        </>
    );
};

export default Header;

interface SearchProp {
    animation: boolean,
    display: string;
}

const LogoContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100px;
    background-color: #252c41;
`;

const RedLine = styled.div`
    width: 100%;
    height: 5px;
    background-color: #f1404b;
`;

const SearchBox = styled.input.attrs(({
    type: 'text',
    placeholder: '아티스트명 또는 곡명'
}))<SearchProp>`
    all: unset;
    border: 5px solid #52616a;
    position: absolute;
    left:50%; transform:translateX(-50%);
    opacity: 0;
    display: ${props => props.display};
    animation: ${props => props.animation ? slideUp : slideDown} .5s ease forwards;
    border-radius: 60px;
    background-color: #ffffff;
    padding-left: 50px;
    width: 450px;
    height: 50px;
    font-size: 20px;
`;

const Logo = styled(NavLink)`
    font-family: 'Russo One', sans-serif;
    text-decoration: none;
    color: #ffffff;
    font-size: 60px;
    font-weight: bold;
    letter-spacing: 10px;
    @media only screen and (max-width: 850px) {
        font-size: 45px;
    }
`;

const SearchBtnWrap = styled.div`
    width: 40px;
    height: 40px;
`;

const SearchBtn = styled(FontAwesomeIcon)`
    font-size: 35px;
    padding-left: 25px;
    padding-bottom: 20px;
    color: white;
    cursor: pointer;
    transition: 0.5s ease;
    &:hover {
        color: #f1404b;
    }
`;