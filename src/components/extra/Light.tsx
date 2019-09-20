import React from 'react'
import LightSvg from './LightSvg'
import moment from 'moment'
import {useFetch, usePosition} from '../Hooks'

import {Error, Loading} from "../Loading";

import './Light.css'

type Body = Readonly<{
    bodyImage: string
    bodyPercent: number
    minTime: Date
    maxTime: Date
    up: boolean
}>

function parseBody(json: any): Body {
    const getPercent = (start, end, now) => {
        return (now.getTime() - start.getTime()) / (end.getTime() - start.getTime())
    };

    const now = moment();
    const bodyRise = moment(json.rise);
    const bodySet = moment(json.set);
    const bodyUp = now.isBetween(bodyRise, bodySet);
    return {
        bodyImage: 'null',
        bodyPercent: getPercent(bodyRise.toDate(), bodySet.toDate(), now.toDate()),
        minTime: json.rise,
        maxTime: json.set,
        up: bodyUp
    }
}

function parseSun(sunJson: any): Body {
    let data = parseBody(sunJson);
    return {
        ...data,
        bodyImage: '/sun-icon.png',
    }
}

function parseMoon(moonJson: any): Body {
    let data = parseBody(moonJson);
    return {
        ...data,
        bodyImage: `/moon-icons/${moonJson.phase}.png`,
    }
}

export default function Light() {
    const [json, error] = useFetch('/planets', '15m');

    if (error) {
        return (<Error name="daylight" error={error.message}/>)
    } else if (!json) {
        return (<Loading/>)
    }

    const sun = parseSun(json.sun);
    const moon = parseMoon(json.moon);

    const renderBody = sun.up ? sun : moon;
    const {bodyPercent, bodyImage, minTime, maxTime} = renderBody;

    return (
        <div className="light">
            <h6 className="center">{renderBody === sun ? 'Daylight' : 'Moonlight'}</h6>
            <LightSvg primaryColor="grey"
                      secondaryColor="black"
                      percent={bodyPercent}
                      planetImage={bodyImage}/>
            <div className="times">
                <p>
                    <span className="left">
                        {moment(minTime).format('h:mm A')}
                    </span>
                    <span className="right">
                        {moment(maxTime).format('h:mm A')}
                    </span>
                </p>
            </div>
        </div>
    )
}
