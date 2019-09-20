import React from 'react';
import {Container} from 'react-materialize';
import {useFetch} from 'util/Hooks';
import SnowdayView from 'components/snowday/Snowday';
import EventView from 'components/events/Event';
import Fact from 'components/facts/Fact';

import './Info.css';
import Carousel from '../Carousel';

function Snowdays() {
  const [snowdays, error] = useFetch('/snowday', '15m');
  const render = !error && snowdays && snowdays.some(({chance}) => chance > 0);
  if (render) {
    const days = snowdays.map(({day, chance}) => {
      return (<SnowdayView key={day} day={day} chance={chance}/>);
    });
    return (
      <>
        <h5 className="snowdaysHeader">Snowdays</h5>
        {days}
      </>
    );
  }
}

function Events() {
  const [eventsData, error] = useFetch('/events', '30m');
  const render = !error && eventsData && eventsData.length > 0;
  if (render) {
    return eventsData.map(({date, name, description}) => {
      return (<EventView key={date} date={date} name={name} description={description}/>);
    });
  }
}

function Facts() {
  const [factsData, error] = useFetch('/facts', '30m');
  const renderFacts = !error && factsData && factsData.length > 0;
  if (renderFacts) {
    return factsData.map((fact) => (<Fact value={fact}/>));
  }
}

export default function Info() {
  const carouselItems = [] as any[];
  const addElement = (value) => {
    if (value instanceof Array) carouselItems.push(...value);
    else if (value) carouselItems.push(value);
  };

  addElement(Facts());
  addElement(Events());
  // TODO add snowdays
  // addElement(Snowdays());

  return (
    <Container>
      <Carousel items={carouselItems} intervalString="20s"/>
    </Container>
  );
}
