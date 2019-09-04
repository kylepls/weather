import BasicService from '~/service/BasicService';
import HttpRequest from '~/util/HttpRequest'
import { WeatherCredentials } from './WeatherBitHttpRequest';

export default class WeatherAlertService extends BasicService {

    private _credentials: WeatherCredentials

    constructor(credentials: WeatherCredentials) {
        super('* */3 * * *')
        this._credentials = credentials
    }

    public makeHttpRequest() {
        return new Weather16DayRequest(this._credentials)
    }
}

type WeatherDay = {
    time: Date,
    tempMax: number,
    tempMin: number,

    precipitation: number
    snow: number,

    iconUrl: string,
    description: string
}

class Weather16DayRequest extends HttpRequest<WeatherDay[]> {

    private _url: string

    constructor(credentials: WeatherCredentials) {
        super()
        const { lat, lon, key } = credentials
        this._url = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${key}&units=I`
    }

    getData() {
        return this.getHtml(this._url).then(this.formatData)
    }

    private formatData(jsonObject: any) {
        return jsonObject.data.map(Weather16DayRequest.parseElement)
    }


    private static parseElement(jsonObject: any): WeatherDay {
        const icon = jsonObject.weather.icon
        const iconUrl = `https://www.weatherbit.io/static/img/icons/${icon}.png`
        return {
            time: new Date(jsonObject.ts * 1000),
            description: jsonObject.weather.description,
            iconUrl: iconUrl,

            tempMax: jsonObject.max_temp,
            tempMin: jsonObject.min_temp,

            precipitation: jsonObject.precip,
            snow: jsonObject.snow
        }
    }
}
