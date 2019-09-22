import React from 'react';

import Graph from './Graph';
import Days from './Days';
import './Forecast.css';

export default function Forecast() {
  return (
    <div className="forecastContainer">
      <Graph/>
      <Days/>
    </div>
  );
}
