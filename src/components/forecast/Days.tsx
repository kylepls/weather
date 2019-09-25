import React, {useContext} from 'react';
import {AppContext} from 'App';
import moment from 'moment';
import {useMediaQuery} from 'react-responsive';
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
  const isSmall = useMediaQuery({query: '(max-width: 900px)'});
  const isVerySmall = useMediaQuery({query: '(max-width: 400px)'});
  return (
    <div className="predictionDay">
      <span className="dayName">{moment.unix(data.time).format( isSmall ? 'ddd' : 'dddd')}</span>
      <br/>
      <img className="dayIcon" alt="icon"
        src={`https://darksky.net/images/weather-icons/${data.icon}.png`}/>
      <br/>
      <p className="tempString">
        <span className="dayTempMax">{Math.round(data.temperatureHigh)}</span>
        {
          isVerySmall? <></> :
            <>
              &nbsp;
              <span className="dayTempMin">{Math.round(data.temperatureLow)}</span>
            </>
        }
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
