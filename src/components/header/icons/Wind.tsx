import React from 'react';

// https://en.wikipedia.org/wiki/Beaufort_scale
// still = 0mph
// blowing = ~20mph
// tornado = gale = ~40mph

const icons = [
  [40, 'tornado'],
  [20, 'wind-blowing'],
  [0, 'wind'],
];

function getIconUrl(speed: number): string {
  const publicUrl = process.env.PUBLIC_URL;
  const [, icon]: any = icons.find(([threshold]: any) => speed >= threshold);
  return `${publicUrl}/header-icons/${icon}.svg`;
}

export default function Wind({speed}: { speed: number }) {
  const iconUrl = getIconUrl(speed);
  return (
    <img src={iconUrl} alt=""/>
  );
}
