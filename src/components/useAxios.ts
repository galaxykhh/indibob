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

export const useAxios = (address: string) => {
    const [data, setData] = useState<HType>();
    const getData = async () => {
        try {
            const response: AxiosResponse = await axios.get(address);
            setData(response.data);
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        getData();
    }, []);// eslint-disable-line

    return data
}

