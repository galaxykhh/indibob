import { useState, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';

export interface HType {
    id: number;
    songTitle: string;
    artist: string;
    image: string;
    bob: number;
    date: number;
}

export const useAxios = (address: string) => {

    const [data, setData] = useState<HType[]>();

    const getData = async () => {
        try {
            const response: AxiosResponse = await axios.get(address);
            setData(response.data);
        } catch(e) {
            console.log(e);
        }
    } 

    useEffect(() => {
        getData();
    }, []);

    return data;
}

