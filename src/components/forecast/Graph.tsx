import React, {useContext} from 'react';
import moment, {Moment} from 'moment';
import {AppContext} from 'App';
import {Area, AreaChart, LabelList, ResponsiveContainer, XAxis, YAxis} from 'recharts';
import './Forecast.css';


function getApplicableDataPoints(data) {
  const now = moment();
  const cutoff = moment().add(12, 'hour');
  const within = (time: Moment) => time.isAfter(now) && time.isBefore(cutoff);
  return data.filter((element) => within(moment.unix(element.time)));
}

function createRechartData(data) {
  return getApplicableDataPoints(data).map((element) => createRechartDataPoint(element));
}

function createRechartDataPoint(weatherDataPoint) {
  return {
    time: weatherDataPoint.time,
    temp: weatherDataPoint.temperature.toFixed(0),
  };
}

function makeTextLabel(props) {
  const {x, y, value} = props;
  return (
    <g>
      <text fontSize='larger' x={x} y={y - 30} fill='#ffffff'>{value}</text>
    </g>
  );
}

function getMinMaxTemperature(data) {
  const temperatures = data.map((point) => point.temperature);
  return [Math.min(...temperatures), Math.max(...temperatures)];
}

export default function Graph() {
  const {weather, weatherError} = useContext(AppContext);
  if (weatherError) {
    return (<div/>);
  } else if (!weather) {
    return (<div/>);
  }

  const hourly = weather.hourly.data;
  const [min, max] = getMinMaxTemperature(getApplicableDataPoints(hourly));

  const getLowerBoundTemp = () => {
    return Math.floor(min - 1);
  };

  const getUpperBoundTemp = () => {
    return Math.ceil(max + 1);
  };

  return (
    <ResponsiveContainer className='forecastGraph' height='50%'>
      <AreaChart margin={{top: 15, right: 20, left: 20, bottom: 5}} data={createRechartData(hourly)}>
        <XAxis
          axisLine={false}
          tickMargin={15}
          interval={1}
          minTickGap={2}
          stroke='#ffffff'
          tick={{dx: 20, fontSize: 20}}
          tickSize={0}
          tickFormatter={(time) => moment.unix(time).format('h A')}
          dataKey='time' />
        <YAxis
          allowDataOverflow={true}
          hide={true}
          domain={[getLowerBoundTemp(), getUpperBoundTemp()]}
          dataKey='temp' />
        <Area type='monotone' dataKey='temp' strokeWidth={4} stroke='#324ea8' fillOpacity={0.25} fill='#0048ff'>
          <LabelList content={makeTextLabel} dataKey='temp' />
        </Area>
      </AreaChart>
    </ResponsiveContainer>
  );
}
