import React from 'react';

import Graph from './Graph';
import Days from './Days';

export default function Forecast() {
  return (
    <div className="forecast">
      <Graph/>
      <Days/>
    </div>
  );
}
