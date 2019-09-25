import Header from 'components/header/Header';
import Forecast from 'components/forecast/Forecast';
import React, {createContext, useEffect} from 'react';
import {useFetch} from 'util/Hooks';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import './App.css';

export const AppContext = createContext<Readonly<{
  weather?: any
  weatherError?: Error,
}>>({});

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

  const [weather, weatherError] = useFetch('/.netlify/functions/weather', '1h');

  return (
    <AppContext.Provider value={{weather, weatherError}}>
      <div className="header-container">
        <Header/>
      </div>
      <div className="forecast-container">
        <Forecast/>
      </div>
    </AppContext.Provider>
  );
}
