import React from 'react';
import ReactDOM from 'react-dom';
import Header from 'components/header/Header';
import Forecast from 'components/forecast/Forecast';
import * as serviceWorker from 'app/serviceWorker';

ReactDOM.render(<Header/>, document.getElementById('header-container'));
ReactDOM.render(<Forecast/>, document.getElementById('forecast'));
serviceWorker.unregister();
