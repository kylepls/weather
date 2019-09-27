import React from 'react';

// https://ral.ucar.edu/general/Summer2012/FPAW_2012_Summer_Presentations/Seg%204%20Surface%20Observations%20Riger%20Sultan/Baker_Snowfall%20Intensity%20Table%20A4A%20FPAW%20Summer%20Brief%20v3.pdf
const levels: number[][] = [
  [0, 4], // none
  [0.098, 3], // light
  [0.39, 2], // moderate
  [2, 1], // heavy
];

function getSpeed(amount: number) {
  return levels.reduce((prev, curr) => {
    const last = Math.abs(curr[0] - amount);
    const next = Math.abs(prev[0] - amount);
    return (last < next ? curr : prev);
  })[1];
}

export default function Snow({amount}: any) {
  const publicUrl = process.env.PUBLIC_URL;
  const speed = getSpeed(amount);
  const style = amount !== 0 ? `animation-duration: ${speed}s` : '';

  return (
    <object type="image/svg+xml" data={`${publicUrl}/header-icons/snow.svg?date=${speed}`}>
      <param name="s" value={style}/>
    </object>
  );
}
