import { useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';

export interface HType {
    albumTitle: string;
    songTitle: string;
    artist: string;
    image: string;
    bob: number;
    date: number;
}

// Hot Indie, New Indie, 그리고 추후 새로 만들 차트에서도 서버를 받아오기 위해서 useAxios 라는 커스텀훅을 만들어 재사용.

export const useAxios = (address: string) => { // 파라미터로 받아올 서버의 주소를 받는다
    const [data, setData] = useState<HType>();
    const getData = async () => {
        try {
            const response: AxiosResponse = await axios.get(address); // 파라미터로 받은 주소
            setData(response.data);
        } catch (e) {
            console.log(e);
        }
    }
    // useEffect 관련 리액트 오류떄문에 임시방편으로 eslint-disable-line을 써서 에러로 인식하지 않게 만든다.
    useEffect(() => {
        getData();
    }, []);// eslint-disable-line

    return data // 이때, 서버에서 받아온 data를 객체로 리턴하게되면 맵을 돌릴때 data.data.map 이런식으로 한번 더 들어가줘야해서 배열 그대로 리턴을 해준다.
}

