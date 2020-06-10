import React, {useContext} from 'react';
import moment from 'moment';
import {AppContext} from 'App';
import {Area, AreaChart, ResponsiveContainer, XAxis, YAxis} from 'recharts';
import './Forecast.css';


function createRechartData(data) {
  const cutoff = moment().subtract(16, 'hours');
  return data.filter((element) => moment.unix(element.time).isAfter(cutoff))
      .map((element) => createRechartDataPoint(element));
}

function createRechartDataPoint(weatherDataPoint) {
  return {
    time: weatherDataPoint.time,
    temp: weatherDataPoint.temperature.toFixed(0),
  };
}

function withDegree(temp) {
  return temp + '˚';
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
    <ResponsiveContainer className='forecastGraph' maxHeight='50%'>
      <AreaChart margin={{top: 15, right: 30, left: 20, bottom: 5}} data={createRechartData(hourly)}>
        <defs>
          <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#ffffff" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#ffffff" stopOpacity={0.15}/>
          </linearGradient>
        </defs>
        <XAxis interval={5} tickFormatter={(time) => moment.unix(time).format('hh:mm a')} dataKey='time'/>
        <YAxis tickFormatter={(temp) => withDegree(temp)} dataKey='temp' />
        <Area type='monotone' dataKey='temp' stroke='#ffffff' fillOpacity={1} fill="url(#colorTemp)"/>
      </AreaChart>
    </ResponsiveContainer>
  );
}
