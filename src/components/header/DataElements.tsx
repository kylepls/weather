import React from 'react';
import {useFetch} from '../Hooks'
import {Row} from 'react-materialize'
import ParameterDisplay from './ParameterDisplay'
import {Error, Loading} from "../Loading";

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

const colSize = Math.floor(12 / 4);

export default function DataElements() {
    // todo context
    // const [alerts, alertsError] = useFetch('/weather', '15m');
    let alerts;
    let alertsError;
    const [json, dataError] = useFetch('/weather', '15m');
    if (dataError || alertsError) {
        return (<Error name="weather current" error={(dataError || alertsError).message}/>);
    } else if (!json) {
        return (<Loading/>);
    }

    const currentData = json.currently;

    return (
        <div className="currentWeather">
            <h6>{alerts && alerts.length !== 0 ? (
                <Alerts alerts={alerts}/>) : json.description}</h6>
            <br/>
            <Row className="dataElements" text-align="center">
                <WindSpeed speed={currentData.windSpeed}/>
                <WindDirection direction={currentData.windBearing}/>
                <Temp temp={currentData.temperature}/>
                <Precipitation amount={json.precipIntensity || 0} type={json.precipType}/>
            </Row>
        </div>
    );
}

function WindSpeed({speed}) {
    const format = (speed) => `${speed} mph`;
    return (
        <ParameterDisplay value={speed} colSize={colSize} image={
            (<WindIcon speed={speed}/>)
        } formatter={format}/>
    );
}

function WindDirection({direction}) {
    return (
        <ParameterDisplay value={direction} colSize={colSize} image={
            (<CompassIcon directionDeg={direction}/>)
        } formatter={formatWindDirection}/>
    );
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
    ];

    const dist = (a: number, b: number) => Math.abs(a - b);

    const [, name] = directions.reduce((prev: any, next: any) => {
        return dist(prev[0], current) < dist(next[0], current) ? prev : next
    });

    return `${name}`;
}

function Temp({temp}) {
    const formatter = (temp) => `${temp} ℉`;
    return (
        <ParameterDisplay value={temp} colSize={colSize} formatter={formatter} image={
            (<TempIcon temp={temp}/>)
        }/>
    );
}

type PercipType = "rain" | "snow" | "sleet";

function Precipitation({amount, type}: { amount: number, type: PercipType }) {
    const formatter = (amount) => amount === 0 ? 'No rain' : `${amount}″/hr`;
    return (
        <ParameterDisplay
            colSize={colSize}
            value={amount}
            formatter={formatter}
            image={
                type !== "snow" ?
                    (<RainIcon amount={amount}/>)
                    : (<SnowIcon amount={amount}/>)
            }
        />
    );
}

function Alerts({alerts}: { alerts: Alert[] }) {
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
