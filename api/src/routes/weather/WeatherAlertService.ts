import HttpRequest from '~/util/HttpRequest'
import BasicService from '~/service/BasicService';
import { WeatherCredentials } from './WeatherBitHttpRequest';

export type WeatherAlert = {
    title: string,
    description: string,
    severity: string,
    timeStart: Date,
    timeEnd: Date
}

export default class WeatherAlertService extends BasicService {

    private _credentials: WeatherCredentials

    constructor(credentials: WeatherCredentials) {
        super('* */4 * * *')
        this._credentials = credentials
    }

    public makeHttpRequest() {
        return new WeatherAlertHttpRequest(this._credentials)
    }
}

class WeatherAlertHttpRequest extends HttpRequest<WeatherAlert[]> {

    private _url: string

    constructor(credentials: WeatherCredentials) {
        super()
        const { lat, lon, key } = credentials
        this._url = `https://api.weatherbit.io/v2.0/alerts?lat=${lat}&lon=${lon}&key=${key}`
    }

    public getData() {
        return this.getHtml(this._url).then(this.parseJson);
    }

    private parseJson = (json: any) => {
        return json.alerts.map((alert: any) => {
            const { title, description, severity, effective_local, expires_local } = alert
            return { ...alert }
        })
    }
}
