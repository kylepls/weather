import React from "react";
import {useFetch} from "../Hooks";
import {Col, Container, Row} from "react-materialize";
import moment from 'moment'
import {Error, Loading} from "../Loading";
import Textfit from 'react-textfit'

import './Rockets.css'

type Rocket = Readonly<{
    name: string
    time: Date
}>

export default function Rockets({count}) {
    let rockets: Rocket[] | any = useFetch('http://localhost:8000/rockets', '15m')

    if (!rockets) {
        return (<Loading/>)
    } else if (rockets.err) {
        return (<Error name="rockets" msg={rockets.err}/>)
    }

    rockets = rockets.slice(0, count);

    return (
        <Container className="rockets">
            <h6 className="center">Rocket Launches</h6>
            <br />
            {
                rockets.map((r, i) => (<Rocket key={i} rocket={r}/>))
            }
        </Container>
    )
}

function Rocket({rocket}: { rocket: Rocket }) {
    return (
        <Row className="rocket">
            <Col s="8">
                <Textfit>{rocket.name}</Textfit>
            </Col>
            <Col s="4">{moment(rocket.time).format("ddd, ha")}</Col>
        </Row>
    )
}