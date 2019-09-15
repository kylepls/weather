import React from 'react';
import { useFetch } from '../Hooks'
import {Row} from 'react-materialize'
import ParameterDisplay from './ParameterDisplay'
import {Loading, Error} from "../Loading";

import CompassIcon from './icons/Compass'
import TempIcon from './icons/Temp'
import RainIcon from './icons/Rain'
import SnowIcon from './icons/Snow'
import WindIcon from './icons/Wind'

import './DataElements.css'

type Alert = {
    severity: 'Advisory' | 'Watch' | 'Warning'
    title: string
}

const colSize = Math.floor(12/4)

export default function DataElements() {
    const alerts: Alert[] | any = useFetch('http://localhost:8000/weatherAlerts', '15m');
    let data = useFetch('http://localhost:8000/weatherCurrent', '15m')
    if (!data) {
        return (<Loading />)
    } else if (data.err) {
        return (<Error msg={data.err} name="weather current" /> )
    } 
    data = data[0];
    
    return (
        <div className="currentWeather">
            <h6>{alerts && alerts.length !== 0 ? (<Alerts alerts={alerts} />) : data.description}</h6>
            <br />
            <Row className="dataElements" text-align="center">
                <WindSpeed speed={data.windSpeed} />
                <WindDirection direction={data.windDirectionDeg} />
                <Temp temp={data.temp} />
                <Precipitation rain={data.precipitation} snow={data.snow} />
            </Row>
        </div>
    )
}

function WindSpeed({speed}) {
    const format = (speed) => `${speed} mph`
    return (
      <ParameterDisplay value={speed} colSize={colSize} image={
          (<WindIcon speed={speed} />)
      } formatter={format} />
    )
}

function WindDirection({direction}) {
    return (
        <ParameterDisplay value={direction} colSize={colSize} image={
            (<CompassIcon directionDeg={direction} />)
        } formatter={formatWindDirection} />
    )
}

function formatWindDirection(current: number) {
    const directions = [
        [0, 'North'],
        [45, 'Northeast'],
        [90, 'East'],
        [135, 'Southeast'],
        [180, 'South'],
        [225, 'Southwest'],
        [270, 'West'],
        [315, 'Northwest']
    ]

    const dist = (a: number, b: number) => Math.abs(a-b)

    const [, name] = directions.reduce((prev: any, next: any) => {
        return dist(prev[0], current) < dist(next[0], current) ? prev : next
    })

    return `${name}`
}

function Temp({temp}) {
    const formatter = (temp) => `${temp} ℉`
    return (
        <ParameterDisplay value={temp} colSize={colSize} formatter={formatter}  image={
            (<TempIcon temp={temp} />)
        } />
    )
}

function Precipitation({rain, snow}) {
    const p = Math.max(rain, snow)
    const formatter = (p) => p === 0 ? 'No rain' : `${p}″/hr`
    return (
        <ParameterDisplay
            colSize={colSize}
            value={p}
            formatter={formatter}
            image={
                snow === 0 ?
                (<RainIcon amount={p} />)
                : ( <SnowIcon amount={snow} /> )
            }
        />
    )
}

function Alerts({alerts}: {alerts: Alert[]}) {
    return (
        <div className="alerts">
            { alerts.map((a, i) => (<Alert key={i} alert={a} />))}
        </div>
    )
}

function Alert({alert}) {
    return (
        <div className="alert">
            {alert.severity}: {alert.title}
        </div>
    )
}
