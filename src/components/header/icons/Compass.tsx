import React from 'react';

type Props = Readonly<{
  directionDeg: number
}>

export default function Compass({directionDeg}: Props) {
  const windStyle = {
    transform: `rotate(${directionDeg}deg)`
  };
  const publicUrl = process.env.PUBLIC_URL;
  return (
    <div className="compass">
      <img src={`${publicUrl}/header-icons/compass.svg`}
        style={windStyle} alt=""/>
    </div>
  );
}
