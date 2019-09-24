import React from 'react';

type Props = Readonly<{
  directionDeg: number
}>

export default function Compass({directionDeg}: Props) {
  const publicUrl = process.env.PUBLIC_URL;
  return (
    <div className="compass">
      <object type="image/svg+xml" data={`${publicUrl}/header-icons/compass.svg`}>
        <param name="transform" value={`rotate(${directionDeg})`}/>
      </object>
    </div>
  );
}
