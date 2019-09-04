import React from 'react'
import {Row, Col} from 'react-materialize'
import {Loading, Error} from '../Loading'
import moment from 'moment'
import { useFetch } from '../Hooks'

import './Days.css'

interface WeatherDay {
    time: Date
    description: string
    iconUrl: string
    tempMax: number
    tempMin: number
    precipitation: number
    snow: number
}

function useData(): WeatherDay[] | any {
    const json = useFetch('http://localhost:8000/weatherDaily', '15m')
    if (json && !json.err) {
        return json.splice(0, 5)
    } else {
        return json
    }
}

function PredictionDay({data, index}) {
    return (
        <Col s={2} key={index} className="predictionDay">
            <span className="dayName">{ moment(data.time).format('dddd') }</span>
            <br />
            <img className="dayIcon" alt="icon" src={data.iconUrl} />
            <br />
            <p className="tempString">
                <span className="dayTempMax">{Math.round(data.tempMax)}</span>
                &nbsp;
                <span className="dayTempMin">{Math.round(data.tempMin)}</span>
            </p>
        </Col>
    )
}

export default function Days() {
    const days = useData()
    if (!days) {
        return ( <Loading /> )
    } else if (days.err) {
        return  ( <Error name="days" msg={days.err} /> )
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
    )
}
