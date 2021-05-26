import React from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react';
import musicStore, { MusicData } from '../../../stores/musicStore';
import { tabClose, tabOpen } from '../../../style/keyframes';
import ListItem, { Item } from './ListItem';

interface IPlayList {
    handletab: boolean;
    display: string;
    playList: MusicData[];
    trackIndex: number;
    trackAvailable: boolean;
};

const PlayList: React.FC<IPlayList> = observer(({ handletab, display, playList, trackIndex, trackAvailable }) => {
    return (
        <Container handletab={handletab}
            display={display}
        >
            <Top> 플레이리스트 </Top>
            <ItemBox>
                {playList.map((item, index) => (
                    <ListItem
                        item={item}
                        isPlaying={trackIndex === index && trackAvailable}
                        handleCurrentMusic={() => musicStore.handleCurrentMusic(item)}
                        handleDelete={() => musicStore.handleDelete(item)}
                        key={item.id}
                    />
                ))}
            </ItemBox>
        </Container>
    );
});

export default PlayList;

const Container = styled.div<{ handletab: boolean, display: string }>`
    position: fixed;
    right: 0;
    top: 0;
    display: ${({ display }) => display};
    width: 400px;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.9);
    animation: ${({ handletab}) => handletab ? tabOpen : tabClose} .6s forwards;
`;

const ItemBox = styled.div`
    width: 400px;
    height: 80%;
    overflow: auto;
`;

const Top = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    margin-top: 30px;
    margin-bottom: 15px;
    font-size: 22px;
`;