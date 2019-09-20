import React from 'react'
import moment from 'moment'

export type Snowday = Readonly<{
    day: string
    chance: number
}>

const chances: any = [
    [0.87, 'No school'],
    [0.75, 'Possibly no school'],
    [0.55, 'Delay likely'],
    [-1, 'No chance']
];

function getChanceString(chance: number): string {
    const pair = chances.find(([threshold]: [number]) => chance >= threshold);
    return pair[1]
}

export default function({day, chance}: any) {
    const time = moment(day, 'YYYYMMDD');
    const chanceString = getChanceString(chance);
    return (
        <div className="snowday">
        <p className="snowdayInfo">
        <span className="dayName" >
        { time.format('dddd') }
        </span>
                       :&nbsp;
        <span className="chance">
        { chanceString }
        </span>
            </p>
        </div>
    );
}
