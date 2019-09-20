import React from 'react'
import {Row, Col} from 'react-materialize'
import {Loading, Error} from '../Loading'
import moment from 'moment'
import { useFetch } from '../Hooks'

import './Days.css'

export default function Days() {
    const [days, error] = useData();
    if (!days) {
        return ( <Loading /> );
    } else if (error) {
        return  ( <Error name="days" error={error.message} /> );
    }
    
    return (
        <Row className="predictionDays">
            <Col s={1} />
            {
                days.map((data, index) => {
                    return (
                        <PredictionDay key={index} data={data} index={index} />
                    )
                })
            }
            <Col s={1} />
        </Row>
    );
}

function PredictionDay({data, index}) {
    return (
        <Col s={2} key={index} className="predictionDay">
            <span className="dayName">{ moment.unix(data.time).format('dddd') }</span>
            <br />
            <img className="dayIcon" alt="icon" src={`https://darksky.net/images/weather-icons/${data.icon}.png`} />
            <br />
            <p className="tempString">
                <span className="dayTempMax">{Math.round(data.temperatureHigh)}</span>
                &nbsp;
                <span className="dayTempMin">{Math.round(data.temperatureLow)}</span>
            </p>
        </Col>
    );
}

function useData(): [any, Error]  {
    const [json, error] = useFetch('/weather', '15m');
    if (json) {
        const hourly = json.daily.data;
        return [[...hourly].splice(0, 5), error];
    } else {
        return [json, error];
    }
}
