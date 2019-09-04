import BasicService from '~/service/BasicService'
import { WeatherCredentials, WeatherBitHttpRequest } from "./WeatherBitHttpRequest";

export default class WeatherCurrentService extends BasicService {

    private _credentials: WeatherCredentials

    constructor(credentials: WeatherCredentials) {
        super('0 * * * *')
        this._credentials = credentials
    }

    public makeHttpRequest() {
        return new WeatherCurrentRequest(this._credentials)
    }
}

class WeatherCurrentRequest extends WeatherBitHttpRequest {

    constructor(credentials: WeatherCredentials) {
        super(WeatherCurrentRequest.makeUrl(credentials))
    }

    private static makeUrl(credentials: WeatherCredentials): string {
        const { lat, lon, key } = credentials
        return `https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lon}&units=I&key=${key}&units=I`
    }
}
