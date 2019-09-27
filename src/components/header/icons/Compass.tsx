import React, {useState} from 'react';

import './Compass.css';

type Props = Readonly<{
  directionDeg: number
}>

export default function Compass({directionDeg}: Props) {
  const publicUrl = process.env.PUBLIC_URL;
  return (
    <div className="compass">
      <object type="image/svg+xml" data={`${publicUrl}/header-icons/compass.svg?val=${directionDeg}`}>
        <param name="transform" value={`rotate(${directionDeg})`}/>
      </object>
    </div>
  );
}
