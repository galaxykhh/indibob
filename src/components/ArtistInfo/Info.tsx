import React, {useEffect} from 'react'
import styled from 'styled-components';
import { observer } from 'mobx-react';
import InfoItem from './InfoItem';
import { useParams } from 'react-router-dom';
import musicStore from '../../stores/musicStore';

const Info: React.FC = observer(() => {
    const { artist } : {artist : string} = useParams();

    useEffect(() => {
        musicStore.getSelectedArtistInfo(artist);
    }, [artist])
    return (
        <Container>
            <Artist> {artist} </Artist>
            <SongList> {artist} 노래 목록 </SongList>
            <TAContainer>
                {musicStore.selectedArtist.map(item => (
                    <InfoItem item={item}
                            key={item.id}
                            />
                ))}
            </TAContainer>
        </Container>
    )
});

export default Info

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

const Artist = styled.div`
    margin-bottom: 45px;
    font-size: 31px;
    color: white;
`;

const SongList = styled.div`
    margin-bottom: 45px;
    font-size: 25px;
    color: white;
`;