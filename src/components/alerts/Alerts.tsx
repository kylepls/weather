import React from 'react';

export function Alerts({alerts}) {
  return (
    <div className="alerts">
      {alerts.map((a, i) => (<Alert key={i} alert={a}/>))}
    </div>
  );
}

function Alert({alert}) {
  return (
    <div className="alert">
      {alert.severity}: {alert.title}
    </div>
  );
}
