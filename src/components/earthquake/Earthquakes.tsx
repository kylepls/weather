import React from 'react';
import {useFetch} from 'util/Hooks';
import {Col, Container, Row} from 'react-materialize';
import moment from 'moment';
import Loading from 'components/status/Loading';
import Error from 'components/status/Error';
import Textfit from 'react-textfit';

import './Earthquake.css';

type Earthquake = Readonly<{
  place: string
  time: Date
  magnitude: number
}>

export default function Earthquakes({count}) {
  let [earthquakes, error] = useFetch('/.netlify/functions/earthquakes', '1h');

  if (error) {
    return (<Error name="earthquakes" error={error.message}/>);
  } else if (!earthquakes) {
    return (<Loading/>);
  }

  earthquakes = earthquakes.slice(0, count);

  return (
    <Container className="earthquakes">
      <h6 className="center">Earthquakes</h6>
      <br/>
      {
        earthquakes.map((r, i) => (<Earthquake key={i} earthquake={r}/>))
      }
    </Container>
  );
}

function Earthquake({earthquake}: { earthquake: Earthquake }) {
  return (
    <Row className="earthquake">
      <Col s={2}>{earthquake.magnitude}</Col>
      <Col s={4}>{moment(earthquake.time).format('ddd, ha')}</Col>
      <Col s={12 - 6}>
        <Textfit>{earthquake.place}</Textfit>
      </Col>
    </Row>
  );
}
