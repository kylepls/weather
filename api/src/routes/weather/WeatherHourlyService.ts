import BasicService from '~/service/BasicService'
import { WeatherCredentials, WeatherBitHttpRequest } from "./WeatherBitHttpRequest";

export default class WeatherHourlyService extends BasicService {

    private _credentials: WeatherCredentials

    constructor(credentials: WeatherCredentials) {
        super('* */3 * * *')
        this._credentials = credentials
    }

    public makeHttpRequest() {
        return new WeatherHourlyRequest(this._credentials)
    }
}


class WeatherHourlyRequest extends WeatherBitHttpRequest {

    private static readonly HOURS = 30

    constructor(credentials: WeatherCredentials) {
        super(WeatherHourlyRequest.makeUrl(credentials))
    }

    private static makeUrl(credentials: WeatherCredentials): string {
        const { lat, lon, key } = credentials
        return `https://api.weatherbit.io/v2.0/forecast/hourly?lat=${lat}&lon=${lon}&key=${key}&hours=${this.HOURS}&units=I`
    }
}
