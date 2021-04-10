import { useState, useEffect } from 'react';
import axios from 'axios';

interface HType {
    id: number;
    title: string;
    artist: string;
    image: string;
}

export const useAxios = (address: string) => {

    const [data, setData] = useState<HType[]>([]);

    const getData = async () => {
        try {
            const response = await axios.get(address);
            setData(response.data);
        } catch(e) {
            console.log(e);
        }
    };

    useEffect(() => {
        getData()
    }, []);

    return { data };
}

