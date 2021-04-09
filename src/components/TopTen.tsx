import React from 'react';
import styled from 'styled-components';
import TopTenItem from '../components/TopTenItem';

const D = [
    {
        id: 1,
        title: 'ミュージック',
        artist: 'サカナクション',
        image: 'https://source.unsplash.com/random/50x50',
    },
    {
        id: 2,
        title: '金木犀の夜',
        artist: 'きのこ帝国',
        image: 'https://source.unsplash.com/random/50x50',
    },
    {
        id: 3,
        title: '真昼の月',
        artist: 'NoisyCell',
        image: 'https://source.unsplash.com/random/50x50',
    },
    {
        id: 4,
        title: '至上の空論',
        artist: 'ドラマストア',
        image: 'https://source.unsplash.com/random/50x50',
    },
    {
        id: 5,
        title: '火花',
        artist: 'レルエ',
        image: 'https://source.unsplash.com/random/50x50',
    },
    {
        id: 6,
        title: '겨울소리',
        artist: '박효신',
        image: 'https://source.unsplash.com/random/50x50',
    },
    {
        id: 7,
        title: '숨',
        artist: '박효신',
        image: 'https://source.unsplash.com/random/50x50',
    },
    {
        id: 8,
        title: 'Happy Together',
        artist: '박효신',
        image: 'https://source.unsplash.com/random/50x50',
    },
    {
        id: 9,
        title: 'Pretender',
        artist: 'Official 男髭 Dandism',
        image: 'https://source.unsplash.com/random/50x50',
    },
    {
        id: 10,
        title: 'Beautiful Together',
        artist: '박효신',
        image: 'https://source.unsplash.com/random/50x50',
    },
];

const TopTen: React.FC = () => {
    return (
        <Container>
            {D.map(item => (
                <TopTenItem rank={item.id} image={item.image} title={item.title} artist={item.artist} key={item.id} />
            ))}
        </Container>
    )
}
export default TopTen;

const Container = styled.div`
    display: grid;
    grid-template-rows: repeat(5, 1fr);
    grid-auto-flow: column;
    width: 1000px;
    height: 350px;
    margin-top: 10px;
`;