import {useEffect, useState} from 'react';
import {parseInterval} from './timeutils';

export type duration = string | number

export function useFetch(url: string, updateInterval: duration): [any, Error, boolean] {
  const [json, setJson] = useState();
  const [fetchError, setFetchError] = useState();
  const [position, positionError, loading] = usePosition();

  const fetchUrl = () => {
    if (positionError || loading) {
      return;
    }
    fetch(url, {
      method: 'POST',
      body: JSON.stringify(position),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => res.json()).then(setJson).catch(setFetchError);
  };

  useInterval(fetchUrl, updateInterval, position !== undefined);

  return [json, positionError || fetchError, loading];
}

export function useInterval(callback: () => any, updateInterval: duration, start: boolean = true) {
  let delay: number;
  if (typeof updateInterval === 'string') {
    delay = parseInterval(updateInterval);
  } else {
    delay = updateInterval;
  }

  useEffect(() => {
    callback();
    const id = setInterval(callback, delay);
    return () => clearInterval(id);
  }, [delay, start, callback]);
}

export interface Coordinates {
  latitude: number,
  longitude: number
}

export const usePosition = (): [Coordinates, Error, boolean] => {
  const [coordinates, setCoordinates] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  const onChange = ({coords}: Position) => {
    setError(null);
    setLoading(false);
    setCoordinates({
      latitude: coords.latitude,
      longitude: coords.longitude,
    });
  };
  const onError = (error: PositionError) => {
    setError(error);
    setLoading(false);
  };

  useEffect(() => {
    const geo = navigator.geolocation;
    if (!geo) {
      throw Error('Geolocation is not supported');
    }
    geo.getCurrentPosition(onChange, onError);
    const watcher = geo.watchPosition(onChange, onError);
    return () => geo.clearWatch(watcher);
  }, []);

  return [coordinates, error, loading];
};
