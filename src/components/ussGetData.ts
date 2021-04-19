import { useEffect, useState } from 'react';
import { AxiosResponse } from 'axios';
import musicRepository from './musicRepository';

export interface HType {
    albumTitle: string;
    songTitle: string;
    artist: string;
    image: string;
    bob: number;
    date: number;
}

export const useGetData = (path: string) => {
    const [data, setData] = useState<HType>()

    const getData = async () => {
    const response: AxiosResponse = await musicRepository.getData(path);
    setData(response.data);
    }

    useEffect(() => {
        getData()
    }, []);

    return data;
}