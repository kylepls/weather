export default interface WeatherData {
    time: Date
    description: string
    iconUrl: string

    windDirection: string
    windSpeed: number

    temp: number,
    percipitation: number,
    snow: number
}
