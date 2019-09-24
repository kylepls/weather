import Header from 'components/header/Header';
import Forecast from 'components/forecast/Forecast';
import React, {useEffect} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

export default function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/kiosk' component={() => (<BaseView kiosk={true}/>)}/>
        <Route exact path="/" component={BaseView}/>
      </Switch>
    </Router>
  );
}

function BaseView({kiosk}) {
  useEffect(() => {
    if (kiosk) {
      document.body.style.cursor = 'none';
    }
  }, [kiosk]);
  return (
    <div>
      <div id="header"><Header/></div>
      <div id="forecast"><Forecast/></div>
    </div>
  );
}
