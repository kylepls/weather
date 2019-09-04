import Service from '~/service/Service'
import HttpRequest from '~/util/HttpRequest';
import Cron from 'node-cron'

abstract class BasicService implements Service {

    private _data: any = { 'err': 'Loading' }

    abstract makeHttpRequest(): HttpRequest<any>

    protected constructor(updateInterval: string) {
        Cron.schedule(updateInterval, this.update)
    }

    public update = () => {
        this.makeHttpRequest().getData().then(data => {
            this._data = data
        }).catch(err => {
            console.error(err)
            this._data = { err: "See log for details" }
        })
    }

    get data() {
        return this._data
    }
}

export default BasicService
