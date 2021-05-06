import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import musicStore from '../../stores/musicStore';
import Modal from '../Modal/Modal';
import { observer } from 'mobx-react';
import { NavLink, useParams } from 'react-router-dom';

const Info: React.FC = observer(() => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const addBtn = useRef<HTMLButtonElement>(null)
    const { id }: { id: string } = useParams();
    useEffect(() => {
        musicStore.getSelectedTrackInfo(id);
    }, [id]);

    const showModal = () => {
        setIsOpen(true);
        setTimeout(() => setIsOpen(false), 1500)
    }

    return (
        <Container>
            <TAContainer>
                <Modal isopen={isOpen} >
                    이 곡은 이미 플레이 리스트에 있는 곡입니다
                </Modal>

                <ImgDiv>
                    <Img url={musicStore.selectedTrack.image} />
                </ImgDiv>

                <TABox>
                    <Title> {musicStore.selectedTrack.songTitle} </Title>
                    <Artist to={`/artist/${musicStore.selectedTrack.artist}`}> {musicStore.selectedTrack.artist} </Artist>
                    <BtnBox>
                        <Btn onClick={() => musicStore.handleCurrentMusic(musicStore.selectedTrack)} > ▶ 재생 </Btn>
                        <Btn onClick={() => musicStore.handleAddTrack(musicStore.selectedTrack, showModal)}
                            disabled={isOpen}
                            ref={addBtn}
                            >
                                + 추가
                        </Btn>
                    </BtnBox>
                </TABox>
            </TAContainer>
        </Container>
    )
})

export default Info;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 100px;
    width: 1000px;
`;

const TAContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
`;

const ImgDiv = styled.div`
    width: 200px;
    height: 200px;
`;

const Img = styled.div<{ url: string }>`
    width: 200px;
    height: 200px;
    background-size: cover;
    background-position: center;
    background-image: url(${props => props.url});
`;

const BtnBox = styled.div`
    display: flex;
    flex-direction: row;
    margin-top: 75px;
`;

const TABox = styled.div`
    margin-left: 30px;
    height: 200px;
`;

const Title = styled.div`
    margin-bottom: 10px;
    font-size: 35px;
    color: white;
    max-width: 200px;
    white-space: nowrap;
`;

const Artist = styled(NavLink)`
    text-decoration: none;
    margin-bottom: 10px;
    font-size: 18px;
    color: white;
    max-width: 150px;
    white-space: nowrap;
    &:hover {
        text-decoration: underline;
    }
`;

const Btn = styled.button.attrs(props =>({
    disabled: props.disabled
}))`
    all: unset;
    width: 55px;
    height: 35px;
    padding-left: 5px;
    padding-right: 5px;
    border-radius: 15px;
    color: black;
    text-align: center;
    font-size: 17px;
    margin-right: 10px;
    background-color: #dae9f4;
    cursor: pointer;
    transition: all 0.2s ease;
    &:hover {
        color: white;
        background-color: #f1404b; 
    }
`;