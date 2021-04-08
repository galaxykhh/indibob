import React, { useState, useRef } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { slideUp, slideDown } from '../style/SearchboxSlide';



const Header: React.FC = () => {

    const useSearch = () => {
        const [hide, setHide] = useState<boolean>(true);
        const searchInput = useRef<HTMLInputElement>(null);
        const onClick = () => {
            setHide(!hide);
            searchInput.current?.focus();
        }
        return { hide , onClick, searchInput };
    };
    const handleSearch = useSearch();

    return (
        <>
            <LogoContainer>
                    <Logo to='/' > INDIBOB </Logo>
                    <SearchBtn onClick={handleSearch.onClick} icon={faSearch} />
            </LogoContainer>
                <SearchBox visible={handleSearch.hide} ref={handleSearch.searchInput} />
        </>
    );
};

export default Header;

const LogoContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100px;
    background-color: #252c41;
`;

const SearchBox = styled.input.attrs(({
    type: 'text',
    placeholder: '아티스트명 또는 곡명'
}))<{ visible: boolean }>`
    all: unset;
    border: 5px solid #52616a;
    position: absolute;
    left:50%; transform:translateX(-50%);
    animation: ${props => props.visible ? slideUp : slideDown } .6s ease forwards;
    border-radius: 60px;
    background-color: #ffffff;
    padding-left: 50px;
    width: 450px;
    height: 60px;
    font-size: 22px;
`;

const Logo = styled(NavLink)`
    font-family: 'Russo One', sans-serif;
    text-decoration: none;
    color: #ffffff;
    font-size: 70px;
    font-weight: bold;
    letter-spacing: 10px;
`;

const SearchBtn = styled(FontAwesomeIcon)`
    font-size: 35px;
    padding-left: 25px;
    padding-bottom: 20px;
    color: white;
    cursor: pointer;
`;