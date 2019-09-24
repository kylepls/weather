import React, {useContext} from 'react';
import {AppContext} from 'App';
import moment from 'moment';

import Loading from 'components/status/Loading';
import Error from 'components/status/Error';
import './Days.css';

export default function Days() {
  const [days, error] = useData(7);
  if (!days) {
    return (<Loading/>);
  } else if (error) {
    return (<Error name="days" error={error.message}/>);
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

function useData(days: number): [any, Error | undefined] {
  const {weather, weatherError} = useContext(AppContext);
  if (weather) {
    const hourly = weather.daily.data;
    return [[...hourly].splice(0, days), weatherError];
  } else {
    return [weather, weatherError];
  }
}
