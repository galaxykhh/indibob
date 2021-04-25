import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import musicStore from '../../stores/musicStore';
import Modal from '../Modal/Modal';
import { observer } from 'mobx-react';
import { useParams } from 'react-router-dom';

const Top: React.FC = observer(() => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const addBtn = useRef<HTMLButtonElement>(null)
    const { id }: { id: string } = useParams();
    useEffect(() => {
        musicStore.getSelectedTrack(id);
    }, [id]);

    const showModal = () => {
        setIsOpen(true);
        setTimeout(() => setIsOpen(false), 1500)
    }

    return (
        <Container>
            <Modal isopen={isOpen} >
                <Ment>
                    이 곡은 이미 플레이 리스트에 있는 곡입니다
                </Ment>
            </Modal>
            <ImgDiv>
                <Img url={musicStore.selectedTrack.image} />
            </ImgDiv>
            <TABox>
                <Title> {musicStore.selectedTrack.songTitle} </Title>
                <Artist> {musicStore.selectedTrack.artist} </Artist>
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
        </Container>
    )
})

export default Top;

const Ment = styled.div`
    color: white;
    font-size: 18px;
    text-align: center;
    margin-top: 10px;
`;

export const Container = styled.div`
    display: flex;
    flex-direction: row;
    margin-top: 100px;
    width: 1000px;
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

// const AlbumTitle = styled.div`
//     margin-bottom: 10px;
//     font-size: 20px;
//     color: white;
//     max-width: 200px;
//     white-space: nowrap;
// `;

const Artist = styled.div`
    margin-bottom: 10px;
    font-size: 18px;
    color: white;
    max-width: 150px;
    white-space: nowrap;
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