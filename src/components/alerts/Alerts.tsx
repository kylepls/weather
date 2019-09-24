import React, {useContext} from 'react';
import {AppContext} from 'App';

type Severity = 'advisory' | 'watch' | 'warning';

interface WeatherAlert {
  title: string;
  time: Date;
  expires: Date;
  severity: Severity;
  description: string;
  uri: string;
}

export function Alerts() {
  const {weather, weatherError} = useContext(AppContext);
  if (weatherError || !weather || !weather.alerts) {
    return (<></>);
  } else {
    const alerts: WeatherAlert[] = weather.alerts.map((a: any) => {
      return {
        title: a.title,
        time: new Date(a.time * 1000),
        expires: new Date(a.expires * 1000),
        description: a.description,
      };
    });
    return (
      <div className="alerts">
        {alerts.map((a, i) => (<Alert key={i} alert={a}/>))}
      </div>
    );
  }
}

function Alert({alert}: { alert: WeatherAlert }) {
  return (
    <div className="alert">
      {alert.severity}: {alert.title}
    </div>
  );
}
