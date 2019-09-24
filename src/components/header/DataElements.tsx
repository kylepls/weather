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
    <div className="weatherContainer">
      <WindSpeed speed={currentData.windSpeed}/>
      <WindDirection direction={currentData.windBearing}/>
      <Temp temp={currentData.temperature}/>
      <Precipitation amount={currentData.precipIntensity || 0} type={currentData.precipType}/>
    </div>
  );
}

function WindSpeed({speed}) {
  const format = (speed) => `${speed} mph`;
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

function formatWindDirection(current: number) {
  const directions = [
    [0, 'North'],
    [45, 'Northeast'],
    [90, 'East'],
    [135, 'Southeast'],
    [180, 'South'],
    [225, 'Southwest'],
    [270, 'West'],
    [315, 'Northwest'],
  ];

  const dist = (a: number, b: number) => Math.abs(a - b);

  const [, name] = directions.reduce((prev: any, next: any) => {
    return dist(prev[0], current) < dist(next[0], current) ? prev : next;
  });

  return `${name}`;
}

function Temp({temp}) {
  const formatter = (temp) => `${temp} ℉`;
  return (
    <ParameterDisplay value={temp} formatter={formatter} image={
      (<TempIcon temp={temp}/>)
    }/>
  );
}

type PercipType = 'rain' | 'snow' | 'sleet';

function Precipitation({amount, type}: { amount: number, type: PercipType }) {
  const formatter = (amount) => amount === 0 ? 'No rain' : `${amount}″/hr`;
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
