import React from 'react';
import {useFetch} from 'util/Hooks';
import moment from 'moment';
import './Days.css';

export default function Days() {
  const [days, error] = useData(7);
  if (!days) {
    return <div/>;
  } else if (error) {
    return <div/>;
  }

  return (
    <div className="dayContainer dayText">
      {
        days.map((data, index) => {
          return (
            <PredictionDay key={index} data={data}/>
          );
        })
      }
    </div>
  );
}

function PredictionDay({data}) {
  return (
    <div className="predictionDay">
      <span className="dayName">{moment.unix(data.time).format('dddd')}</span>
      <br/>
      <img className="dayIcon" alt="icon"
        src={`https://darksky.net/images/weather-icons/${data.icon}.png`}/>
      <br/>
      <p className="tempString">
        <span className="dayTempMax">{Math.round(data.temperatureHigh)}</span>
        &nbsp;
        <span className="dayTempMin">{Math.round(data.temperatureLow)}</span>
      </p>
    </div>
  );
}

function useData(days: number): [any, Error] {
  const [json, error] = useFetch('/.netlify/functions/weather', '1h');
  if (json) {
    const hourly = json.daily.data;
    return [[...hourly].splice(0, days), error];
  } else {
    return [json, error];
  }
}
