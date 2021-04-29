import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { slideUp, slideDown } from '../style/keyframes';
import { useSearch } from '../../Hooks/useSearch';
import { observer } from 'mobx-react';
import musicStore from '../../stores/musicStore';
import ResultItem from './ResultItem';

const Header: React.FC = observer(() => {
    
    const handleSearch = useSearch();

    return (
        <>
            <SigninBtn to='/signin'>
                로그인
            </SigninBtn>
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
                               onChange={handleSearch.handleInput}
                               />
                    <SearchResult visible={handleSearch.isExist ? 'visible' : 'hidden'}
                                  animation={handleSearch.animation}
                                  height={`${(musicStore.searchResult.length * 40) + 50}px`} // 결과물 한개당 40픽셀을 주고, 검색창 크기의 50px만큼 기본적으로 설정.
                                  >
                        <div style={{ height: '50px' }} />
                        {musicStore.searchResult?.map(x => (
                            <ResultItem image={x.image}
                                        songTitle={x.songTitle}
                                        artist={x.artist}
                                        key={x.id}
                                        id={x.id}
                                        onClick={handleSearch.handleSearchBox}
                                        />
                        ))}
                    </SearchResult>
            </LogoContainer>
        </>
    );
});

export default Header;

interface SearchProp {
    animation: boolean,
    display?: string;
    visible?: string,
    height?: string,
}

const LogoContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100px;
    background-color: #252c41;
    border-bottom: #f1404b solid 5px;
`;

const SearchBox = styled.input.attrs(({
    type: 'text',
    placeholder: '아티스트명 또는 곡명'
}))<SearchProp>`
    all: unset;
    position: absolute;
    left:50%; transform:translateX(-50%);
    opacity: 0;
    display: ${props => props.display};
    animation: ${props => props.animation ? slideUp : slideDown} .5s ease forwards;
    border-radius: 60px;
    background-color: rgba(0, 0, 0, 1);
    color: white;
    padding-left: 50px;
    width: 450px;
    height: 50px;
    font-size: 20px;
    z-index: 3;
`;

const SearchResult = styled.div<SearchProp>`
    position: absolute;
    left:50%; transform:translateX(-50%);
    opacity: 0;
    visibility: ${props => props.visible};
    animation: ${props => props.animation ? slideUp : slideDown} .5s ease forwards;
    border-radius: 30px;
    background-color: rgba(0, 0, 0, 0.8);
    padding-left: 50px;
    width: 450px;
    height: ${props => props.height};
    max-height: 600px;
    overflow: auto;
    z-index: 2;
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

const SigninBtn = styled(NavLink)`
    all: unset;
    position: absolute;
    top: 35px;
    right: 25px;
    border: solid white 1px; border-radius: 40px;
    color: white;
    text-align: center;
    width: 70px;
    height: 25px;
    padding-top: 5px;
    cursor: pointer;
    transition: 0.3s ease;
    &:hover {
        background-color: white;
        border-color: #f1404b;
        color: #f1404b;
    }
`;