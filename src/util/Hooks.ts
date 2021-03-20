import {useEffect, useState} from 'react';
import {parseInterval} from './TimeUtils';

export type duration = string | number

export interface Coordinates {
  readonly latitude: number,
  readonly longitude: number
}

export interface GeolocationPositionError {
  readonly message: string
}

interface GeolocationPosition {
  readonly coords: Coordinates
}

export const useFetch = (url: string, updateInterval: duration): [any, any | undefined] => {
  const [json, setJson] = useState();
  const [fetchError, setFetchError] = useState();
  const [position, positionError] = usePosition();

  const fetchUrl = () => {
    if (!position) {
      return;
    }

    const request = {
      method: 'POST',
      body: JSON.stringify({
        latitude: position.latitude,
        longitude: position.longitude,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    fetch(url, request)
        .then((res) => res.json())
        .then(setJson)
        .catch(setFetchError);
  };

  useInterval(fetchUrl, updateInterval, position !== null);

  return [json, positionError || fetchError];
};

const usePosition = (): [(Coordinates | null), (GeolocationPositionError | null), boolean] => {
  const [coordinates, setCoordinates] = useState<Coordinates | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<GeolocationPositionError | null>(null);
  const onChange = ({coords}: GeolocationPosition) => {
    setError(null);
    setLoading(false);
    setCoordinates(coords);
  };

  const onError = (error: GeolocationPositionError) => {
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

export const useInterval = (callback: () => any, updateInterval: duration, start: boolean = true) => {
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
  }, [delay, start]);
};
