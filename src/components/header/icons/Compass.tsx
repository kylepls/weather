import React from 'react';

type Props = Readonly<{
  directionDeg: number
}>

export default function Compass({directionDeg}: Props) {
  const publicUrl = process.env.PUBLIC_URL;
  return (
    <div>
      <object type="image/svg+xml" data={`${publicUrl}/header-icons/compass.svg`} id="compass">
        <param name="rotate" value={'rotate(' + directionDeg + 'deg)'}/>
      </object>
    </div>
  );
}
