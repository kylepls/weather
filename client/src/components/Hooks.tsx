import { useState, useEffect, useRef } from 'react'
import { parseInterval } from './Utils'

export type duration = string | number

export function useFetch(url: string, updateInterval: duration) {
    const [json, updateJson] = useState()

    const fetchUrl = () => {
        fetch(url).then(res => {
            return res.json();
        }).then(updateJson);
    }

    useInterval(fetchUrl, updateInterval)

    return json
}

export function useInterval(callback: ()=>any, updateInterval: duration) {
    let delay: number;
    if (typeof updateInterval === 'string') {
        delay = parseInterval(updateInterval)
    } else {
        delay = updateInterval
    }

    const savedCallback = useRef(callback);

    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
        const tick = () => savedCallback.current()
        tick()
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
    }, [delay]);
}
