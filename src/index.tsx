import React from 'react';
import ReactDOM from 'react-dom';
import Header from 'components/header/Header';
import Forecast from 'components/forecast/Forecast';
import Light from 'components/light/Light';
import Rockets from 'components/rockets/Rockets';
import Info from 'components/info/Info';
import Carousel from 'components/Carousel';
import Earthquakes from 'components/earthquake/Earthquakes';
import DataElements from './components/header/DataElements';

function ExtraItems() {
  return (
    <Carousel items={[
      (<Rockets count={6}/>),
      (<Earthquakes count={5}/>),
    ]} intervalString="1m"/>
  );
}

ReactDOM.render(<Header/>, document.getElementById('header'));
ReactDOM.render(<Forecast/>, document.getElementById('forecast'));
// ReactDOM.render(<Light/>, document.getElementById('light'));
// ReactDOM.render(<ExtraItems/>, document.getElementById('right-items'));
// ReactDOM.render(<Info/>, document.getElementById('info'));
