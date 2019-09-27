import React, {useContext} from 'react';
import {Chart} from 'react-google-charts';
import moment from 'moment';
import {AppContext} from 'App';
import {useMediaQuery} from 'react-responsive';
import GraphOptions from './GraphOptions.json';
import './Forecast.css';

const cutoffTime = moment.duration(16, 'hours');

function makeGraphData(data, annotationFrequency: number = 1) {
  return data.filter((item) => {
    return new Date(item.time * 1000) > new Date();
  }).filter((item) => {
    const cutoff = moment().add(cutoffTime);
    const itemTime = moment.unix(item.time);
    return itemTime.isBefore(cutoff);
  }).map((item, index) => {
    const showAnnotation = index % annotationFrequency === 0;
    return [
      new Date(item.time * 1000),
      item.temperature,
      showAnnotation ? Math.round(item.temperature) : '',
      showAnnotation ? item.temperature : '',
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
  const isVerySmall = useMediaQuery({query: '(max-width: 400px)'});
  if (weatherError) {
    return (<div/>);
  } else if (!weather) {
    return (<div/>);
  }

  const hourly = weather.hourly.data;
  const annotationFrequency = isVerySmall ? 2 : 1;

  return (
    <div className="forecastGraph">
      <Chart
        width="100%"
        chartType="AreaChart"
        loader={<div>Loading Chart...</div>}
        data={[makeGraphHeaders(), ...makeGraphData(hourly, annotationFrequency)]}
        options={makeGraphOptions(6)}
      />
    </div>
  );
}
