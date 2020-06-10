import Forecast from 'components/forecast/Forecast';
import Header from 'components/header/Header';
import React, {createContext, useEffect} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import './App.css';
import './Preloader.css';
import {useFetch} from './util/Hooks';

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

  let loadingMessage;
  if (!weather) {
    loadingMessage = 'Waiting for weather data';
  } else if (weatherError) {
    loadingMessage = 'Could not load weather: ' + weatherError.message;
  }

  return (
    <AppContext.Provider value={{weather, weatherError}}>
      {
        weather ? (
          <>
            <div className="header-container">
              <Header/>
            </div>
            <div className="forecast-container">
              <Forecast/>
            </div>
          </>
        ) : (<Loading message={loadingMessage} />)
      }
    </AppContext.Provider>
  );
}

function Loading({message}) {
  return (
    <div className="preloader">
      <h1 className="loading">{message}<span>.</span><span>.</span><span>.</span></h1>
    </div>
  );
}
