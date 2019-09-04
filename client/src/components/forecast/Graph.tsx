import React from 'react'
import { useFetch } from '../Hooks'
import { Chart } from 'react-google-charts'
import WeatherData from '../WeatherData'
import GraphOptions from './GraphOptions.json'
import {Loading, Error} from "../Loading";

function makeGraphData(data: WeatherData[]) {
    return data.filter(item => {
        return new Date(item.time) > new Date()
    }).filter((_, index) => {
        return index % 3 === 0
    }).map(item => {
        return [
            new Date(item.time),
            item.temp,
            Math.round(item.temp),
            item.temp
        ]
    })
}

function makeGraphHeaders() {
    return [
        { type: 'date' },
        'y',
        { role: 'annotation', type: 'string'},
        { role: 'annotationText', type: 'string'}
    ]
}

function makeGraphOptions(gridlines: number) {
    const options =  {
        ...GraphOptions
    }
    options.hAxis.gridlines.count = gridlines;
    return options
}

export default function Graph() {
    const data: WeatherData[] | any = useFetch('http://localhost:8000/weatherHourly', '15m')
    if (!data) {
        return ( <Loading /> )
    } else if (data.err) {
        return  ( <Error name="Graph" msg={data.err}/> )
    } 

    return (
        <div className="forecastGraph">
            <Chart
                width="100%"
                chartType="AreaChart"
                loader={ <div>Loading Chart...</div> }
                data={ [ makeGraphHeaders(), ...makeGraphData(data) ] }
                options={ makeGraphOptions(data.length/3) }
            />
        </div>
    )
}
