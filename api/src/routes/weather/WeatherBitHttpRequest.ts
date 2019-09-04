import HttpRequest from "~/util/HttpRequest";

export type WeatherData  = {
    time: string
    description: string
    iconUrl: string

    windDirection: string
    windDirectionDeg: number
    windSpeed: number

    temp: number
    precipitation: number
    snow: number
}

export type WeatherCredentials = {
    lat: number,
    lon: number,
    key: string
}

export abstract class WeatherBitHttpRequest extends HttpRequest<WeatherData[]> {

    private _url: string

    constructor(url: string) {
        super()
        this._url = url
    }

    public getData(): Promise<WeatherData[]> {
        return this.getHtml(this._url).then(WeatherBitHttpRequest.parseData)
    }

    private static parseData(jsonObject: any): WeatherData[] {
        return jsonObject.data.map(WeatherBitHttpRequest.parseElement)
    }

    private static parseElement(jsonObject: any): WeatherData {
        const icon = jsonObject.weather.icon
        const iconUrl = `https://www.weatherbit.io/static/img/icons/${icon}.png`
        return {
            time: jsonObject.timestamp_local,
            description: jsonObject.weather.description,
            iconUrl: iconUrl,

            windDirection: jsonObject.wind_cdir_full,
            windDirectionDeg: jsonObject.wind_dir,
            windSpeed: jsonObject.wind_spd,

            temp: jsonObject.temp,
            precipitation: jsonObject.precip,
            snow: jsonObject.snow
        }
    }
}
