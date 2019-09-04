import Service from '~/service/Service';

let SunCalc = require('suncalc2')

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
]

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

export default class SolarService implements Service {

    private _lat: number
    private _lon: number

    constructor(lat: number, lon: number) {
        this._lat = lat
        this._lon = lon
    }

    public update() { }

    get data() {
        return this.makeData()
    }

    private makeData() {
        return {
            sun: this.calcSun(),
            moon: this.calcMoon()
        }
    }

    private calcSun(): SunInfo {
        let times = SunCalc.getTimes(new Date(), this._lat, this._lon)
        let position = SunCalc.getPosition(new Date(), this._lat, this._lon)

        return {
            rise: times.sunrise,
            set: times.sunset,
            altitude: position.altitude,
            azimuth: position.azimuth
        }
    }

    private calcMoon(): MoonInfo {
        let times = SunCalc.getMoonTimes(new Date(), this._lat, this._lon)
        let position = SunCalc.getMoonPosition(new Date(), this._lat, this._lon)
        let illumination = SunCalc.getMoonIllumination(new Date())

        return {
            rise: times.rise,
            set: times.set,
            altitude: position.altitude,
            azimuth: position.azimuth,
            phase: this.moonFractionToPhase(illumination.phase),
            illumination: illumination.fraction
        }
    }

    private moonFractionToPhase(fraction: number): string {
        let minIndex = -1
        let minDist = 1
        for (let i = 0; i < moonPhaseNames.length; i++) {
            let value = i * (1/moonPhaseNames.length)
            let dist = Math.abs(fraction - value)
            if (dist < minDist) {
                minDist = dist
                minIndex = i
            }
        }

        return moonPhaseNames[minIndex]
    }
}
