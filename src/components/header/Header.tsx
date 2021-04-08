import React, {useState} from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { slideUp, slideDown } from '../style/SearchboxSlide';



const Header: React.FC = () => {

    const useSearch = () => {
        const [hide, setHide] = useState(true);
        const onClick = () => {
            setHide(!hide)
        }
        return { hide , onClick }
    }

    const handleSearch = useSearch();

    return (
        <>
            <LogoContainer>
                    <Logo to='/' > INDIBOB </Logo>
                    <FontAwesomeIcon {...handleSearch} icon={faSearch} style={{ fontSize: '35px', paddingLeft: '25px',paddingBottom: '20px', color: 'white', cursor: 'pointer'}} />
            </LogoContainer>
                <SearchBox hide={handleSearch.hide} />
        </>
    )
}

export default Header;

const LogoContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100px;
    background-color: #252c41;
`;

const SearchBox = styled.input<{hide: boolean}>`
    all: unset;
    border: 5px solid #52616a;
    position: absolute;
    top: 50px;
    left:50%; transform:translateX(-50%);
    display: ${props => props.hide ? 'none' : 'block'};
    animation: ${props => props.hide ? slideUp : slideDown} .4s ease forwards;
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