import moment from 'moment'
import HttpRequest from '~/util/HttpRequest'

export interface EarthquakeEvent {
    place: string
    time: number
    magnitude: number
}

export default class EarthquakeRequest extends HttpRequest<EarthquakeEvent[]> {

    private readonly _lat: number;
    private readonly _lon: number;

    constructor(lat: number, lon: number) {
        super();
        this._lat = lat;
        this._lon = lon;
    }

    public getData(): Promise<EarthquakeEvent[]> {
        return this.getHtml(this.makeUrl()).then(this.formatHttpData)
    }

    private formatHttpData(input: any): EarthquakeEvent[] {
        let output: EarthquakeEvent[] = [];
        console.log(input);
        for (let feature of input.features) {
            const modified: EarthquakeEvent = {
                place: feature.properties.place,
                time: feature.properties.time,
                magnitude: feature.properties.mag,
            };
            output.push(modified)
        }
        return output
    }

    private makeUrl(): string {
        let time = moment().subtract(2, 'days').format('YYYY-MM-DD');
        let lat = this._lat;
        let lon = this._lon;
        return `http://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=${time}&latitude=${lat}&longitude=${lon}&maxradiuskm=750`;
    }
}
