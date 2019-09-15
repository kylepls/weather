import {APIGatewayEvent} from "aws-lambda";
import {Coordinates} from "./earthquakes";

const SunCalc = require('suncalc2');

//https://www.npmjs.com/package/suncalc2
const moonPhaseNames = [
    'New Moon',
    'Waxing Crescent',
    'First Quarter',
    'Waxing Gibbous',
    'Full Moon',
    'Waning Gibbous',
    'Last Quarter',
    'Waning Crescent',
    'New Moon',
];

interface BodyInfo {
    rise: Date
    set: Date
    altitude: number
    azimuth: number
}

interface SunInfo extends BodyInfo {
}

interface MoonInfo extends BodyInfo {
    phase: string
    illumination: number
}

export async function handler(event: APIGatewayEvent): Promise<any> {
    const body = JSON.parse(event.body || "");
    const coords: Coordinates = body as Coordinates;
    const data = {
        sun: calcSun(coords),
        moon: calcMoon(coords)
    };
    return {
        statusCode: 200,
        body: JSON.stringify(data)
    }
}

function calcSun(coords: Coordinates): SunInfo {
    const times = SunCalc.getTimes(new Date(), coords.longitude, coords.longitude);
    const position = SunCalc.getPosition(new Date(), coords.latitude, coords.longitude);

    return {
        rise: times.sunrise,
        set: times.sunset,
        altitude: position.altitude,
        azimuth: position.azimuth
    }
}

function calcMoon(coords: Coordinates): MoonInfo {
    const times = SunCalc.getMoonTimes(new Date(), coords.latitude, coords.longitude);
    const position = SunCalc.getMoonPosition(new Date(), coords.latitude, coords.longitude);
    const illumination = SunCalc.getMoonIllumination(new Date());

    return {
        rise: times.rise,
        set: times.set,
        altitude: position.altitude,
        azimuth: position.azimuth,
        phase: moonFractionToPhase(illumination.phase),
        illumination: illumination.fraction
    }
}

function moonFractionToPhase(fraction: number): string {
    let minIndex = -1;
    let minDist = 1;
    for (let i = 0; i < moonPhaseNames.length; i++) {
        let value = i * (1 / moonPhaseNames.length);
        let dist = Math.abs(fraction - value);
        if (dist < minDist) {
            minDist = dist;
            minIndex = i;
        }
    }

    return moonPhaseNames[minIndex]
}
