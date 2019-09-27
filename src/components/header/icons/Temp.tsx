import React from 'react';

const TEMP_MIN = 20;
const TEMP_MAX = 100;

const RED = [255, 58, 58];
const BLUE = [57, 126, 255];

function makeTempColor(temp: number) {
  const percent = calcPercent(temp, TEMP_MIN, TEMP_MAX);
  return [0, 1, 2].map((_, i) => {
    return (RED[i] - BLUE[i]) * percent + BLUE[i];
  });
}

function makeTempBounds(temp: number) {
  const svgRectTotal = 12;
  const svgMaxHeight = 20;
  const svgMinHeight = 2;

  const percent = calcPercent(temp, TEMP_MIN, TEMP_MAX);
  const height = (svgMaxHeight - svgMinHeight) * percent + svgMinHeight;
  const y = svgRectTotal - height;
  return [Math.round(height), Math.round(y)];
}

function calcPercent(value: number, min: number, max: number): number {
  return (value - min) / (max - min);
}

export default function Temp({temp}: any) {
  const publicUrl = process.env.PUBLIC_URL;

  const [r, g, b] = makeTempColor(temp);
  const color = `rgb(${r}, ${g}, ${b})`;

  const [height, y] = makeTempBounds(temp);
  return (
    <object type="image/svg+xml" data={`${publicUrl}/header-icons/temp.svg?date=${Date.now()}`}>
      <param name="color" value={color}/>
      <param name="height" value={height}/>
      <param name="y" value={y}/>
    </object>
  );
}
