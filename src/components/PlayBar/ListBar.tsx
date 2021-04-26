import React from 'react';
import styled from 'styled-components';
import { tabClose, tabOpen } from '../style/keyframes';
import musicStore from '../../stores/musicStore';
import { observer } from 'mobx-react';
import ListItem from './ListItem';

interface IListBar {
    handletab: boolean;
    display: string;
}

const ListBar: React.FC<IListBar> = observer((props) => {
    return (
        <Container handletab={props.handletab}
                   display={props.display}
                   >
            <Top> 플레이리스트 </Top>
            <ItemBox>
                {musicStore.playList.map((item, index) => (
                    <ListItem item={item}
                              key={item.id}
                              isPlaying={musicStore.trackIndex === index}
                              />
                ))}
            </ItemBox>
        </Container>
    )
});

export default ListBar;

const Container = styled.div<{ handletab: boolean, display: string }>`
    position: fixed;
    right: 0;
    top: 0;
    display: ${props => props.display};
    width: 400px;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.9);
    animation: ${props => props.handletab ? tabOpen : tabClose} .6s forwards;
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