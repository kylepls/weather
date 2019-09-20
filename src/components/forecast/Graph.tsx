import React from 'react';
import {useFetch} from 'util/Hooks';
import {Chart} from 'react-google-charts';
import moment from 'moment';

import Loading from 'components/status/Loading';
import Error from 'components/status/Error';
import GraphOptions from './GraphOptions.json';

const cutoffTime = moment.duration(1, 'days');

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
  const [data, error] = useFetch('/weather', '1h');
  if (error) {
    return (<Error name="Graph" error={error.message}/>);
  } else if (!data) {
    return (<Loading/>);
  }

  const hourly = data.hourly.data;

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
