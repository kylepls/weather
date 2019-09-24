import React, {useContext} from 'react';
import {Chart} from 'react-google-charts';
import moment from 'moment';
import {AppContext} from 'App';
import GraphOptions from './GraphOptions.json';
import './Forecast.css';

const cutoffTime = moment.duration(16, 'hours');

function makeGraphData(data) {
  return data.filter((item) => {
    return new Date(item.time * 1000) > new Date();
  }).filter((item) => {
    const cutoff = moment().add(cutoffTime);
    const itemTime = moment.unix(item.time);
    return itemTime.isBefore(cutoff);
  }).map((item, index) => {
    return [
      new Date(item.time * 1000),
      item.temperature,
            index ? Math.round(item.temperature) : '',
            index ? item.temperature : '',
    ];
  });
}

function makeGraphHeaders() {
  return [
    {type: 'date'},
    'y',
    {role: 'annotation', type: 'string'},
    {role: 'annotationText', type: 'string'},
  ];
}

function makeGraphOptions(gridLines: number) {
  const options = {
    ...GraphOptions,
  };
  options.hAxis.gridlines.count = gridLines;
  return options;
}

export default function Graph() {
  const {weather, weatherError} = useContext(AppContext);
  if (weatherError) {
    return (<div/>);
  } else if (!weather) {
    return (<div/>);
  }

  const hourly = weather.hourly.data;

  return (
    <div className="forecastGraph">
      <Chart
        width="100%"
        chartType="AreaChart"
        loader={<div>Loading Chart...</div>}
        data={[makeGraphHeaders(), ...makeGraphData(hourly)]}
        options={makeGraphOptions(6)}
      />
    </div>
  );
}
