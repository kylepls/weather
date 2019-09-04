import Service from '~/service/Service'
import EarthquakeRequest from './EarthquakeRequest'
import Cron from 'node-cron'

export default class EarthquakeService implements Service {

    readonly path: string = '/earthquakes';

    private readonly _lat: number;
    private readonly _lon: number;
    private _data: any;

    constructor(lat: number, lon: number) {
        this._lat = lat;
        this._lon = lon;
        this._data = {'err': 'Loading'};
        Cron.schedule('*/30 * * * *', this.update)
    }

    public update(): void {
        const request: EarthquakeRequest = new EarthquakeRequest(this._lat, this._lon);
        request.getData().then(data => {
            this._data = data
        }).catch(err => {
            console.error(err);
            this._data = {err: "See log for details"}
        })
    }

    get data() {
        return this._data
    }
}
