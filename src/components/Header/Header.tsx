import React, { useState, useRef } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { slideUp, slideDown } from '../../style/keyframes';
import { observer } from 'mobx-react';
import musicStore from '../../stores/musicStore';
import authStore from '../../stores/authStore';
import ResultItem from './ResultItem';

type DisplayType = 'none' | 'block';

interface word {
    word: string;
};

const Header: React.FC = observer(() => {
    const [animation, setAnimation] = useState<boolean>(true); // 검색 애니메이션 boolean
    const [display, setDisplay] = useState<DisplayType>('none'); // 맨 처음 애니메이션이 작동하는걸 보여주지 않기위해 기본값으로 none 설정
    const [isExist, setIsExist] = useState<boolean>(false);
    const searchInput = useRef<HTMLInputElement>(null); // 검색창 인풋

    const toggleSearchBtn = (): void => {
        if (animation) { 
            setAnimation(!animation); // 애니메이션을 boolean 트리거
            searchInput.current?.focus(); // 애니메이션이 끝날쯤에 인풋에 포커스
        } else {
            setAnimation(!animation);
        };
    };

    const handleSearchBox = (): void => {
        if (display === 'none') { // 최초 display가 none일 경우에 block으로 설정
            setDisplay('block');
            toggleSearchBtn();
        } else {
            toggleSearchBtn();
            searchInput.current!.value = ''; // 검색창 초기화
            setIsExist(false);
        };
    };

    const handleInput = (): void => {
        if (searchInput.current) {
            if (searchInput.current.value.replace(/ /g,'') === '') {
                setIsExist(false);
            } else {
                musicStore.getSearchResult(searchInput.current.value);
                setIsExist(true);
            };
        };
    };

    return (
        <>
            {authStore.isSignIn ? 
                <>
                    <SignoutBtn to='/'
                        onClick={authStore.signOut}
                    >
                        로그아웃
                    </SignoutBtn>
                    <InfoBtn to='/mypage'>
                        내 정보
                    </InfoBtn> 
                </> :
                <SigninBtn to='/signin'>
                    로그인
                </SigninBtn>
            }
            <LogoContainer>
                    <Logo to='/' >INDIEBOB</Logo>
                    <SearchBtnWrap>
                        <SearchBtn onClick={handleSearchBox}
                            icon={animation ? faSearch : faTimes}
                        />
                    </SearchBtnWrap>
                    <SearchBox display={display}
                        animation={animation}
                        ref={searchInput}
                        onChange={handleInput}
                    />
                    <SearchResult visible={isExist ? 'visible' : 'hidden'}
                        animation={animation}
                        height={`${(musicStore.searchResult.length * 40) + 50}px`} // 결과물 한개당 40픽셀을 주고, 검색창 크기의 50px만큼 기본적으로 설정.
                    >
                        <div style={{ height: '50px' }} />
                        {musicStore.searchResult?.map(x => (
                            <ResultItem image={x.image}
                                songTitle={x.songTitle}
                                artist={x.artist}
                                key={x.id}
                                id={x.id}
                                onClick={handleSearchBox}
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
};

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
    right: 20px;
    border: solid white 1px; border-radius: 40px;
    color: white;
    text-align: center;
    font-size: 14px;
    width: 60px;
    height: 25px;
    padding-top: 8px;
    cursor: pointer;
    transition: 0.3s ease;
    &:hover {
        background-color: white;
        border-color: #f1404b;
        color: #f1404b;
    }
`;

const SignoutBtn = styled(SigninBtn)`
`;

const InfoBtn = styled(SigninBtn)`
    right: 115px;
`;