import React, {useContext} from 'react';
import ParameterDisplay from './ParameterDisplay';
import {AppContext} from 'App';

import TempIcon from 'components/header/icons/Temp';
import RainIcon from 'components/header/icons/Rain';
import SnowIcon from 'components/header/icons/Snow';
import WindIcon from 'components/header/icons/Wind';
import CompassIcon from 'components/header/icons/Compass';

import './DataElements.css';

export default function DataElements() {
  const {weather, weatherError} = useContext(AppContext);
  if (weatherError) {
    return (<div/>);
  } else if (!weather) {
    return (<div/>);
  }
  const currentData = weather.currently;
  return (
    <div className="weather-elements">
      <WindSpeed speed={currentData.windSpeed}/>
      <WindDirection direction={currentData.windBearing}/>
      <Temp temp={currentData.temperature}/>
      <Precipitation amount={currentData.precipIntensity || 0} type={currentData.precipType}/>
    </div>
  );
}

function WindSpeed({speed}) {
  const format = (speed, small) => small ? `${speed.toFixed(0)}mph` : `${speed} mph`;
  return (
    <ParameterDisplay value={speed} image={
      (<WindIcon speed={speed}/>)
    } formatter={format}/>
  );
}

function WindDirection({direction}) {
  return (
    <ParameterDisplay value={direction} image={
      (<CompassIcon directionDeg={direction}/>)
    } formatter={formatWindDirection}/>
  );
}

function formatWindDirection(current: number, small: boolean) {
  const directions = [
    [0, 'North', 'N'],
    [45, 'Northeast', 'NE'],
    [90, 'East', 'E'],
    [135, 'Southeast', 'SE'],
    [180, 'South', 'S'],
    [225, 'Southwest', 'SW'],
    [270, 'West', 'W'],
    [315, 'Northwest', 'NW'],
  ];

  const dist = (a: number, b: number) => Math.abs(a - b);

  const [, nameBig, nameSmall] = directions.reduce((prev: any, next: any) => {
    return dist(prev[0], current) < dist(next[0], current) ? prev : next;
  });

  return (small? nameSmall : nameBig) as string;
}

function Temp({temp}) {
  const formatter = (temp, small) => `${temp.toFixed(small ? 0 : 2)} ℉`;
  return (
    <ParameterDisplay value={temp} formatter={formatter} image={
      (<TempIcon temp={temp}/>)
    }/>
  );
}

type PercipType = 'rain' | 'snow' | 'sleet';

function Precipitation({amount, type}: { amount: number, type: PercipType }) {
  const formatter = (amount, small) => amount === 0 ? (small ? '0″/hr' : 'No rain') : `${amount}″/hr`;
  return (
    <ParameterDisplay
      value={amount}
      formatter={formatter}
      image={
        type !== 'snow' ?
          (<RainIcon amount={amount}/>) :
          (<SnowIcon amount={amount}/>)
      }
    />
  );
}
