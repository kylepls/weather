import moment from 'moment'
import BasicService from '~/service/BasicService';
import HttpRequest from '~/util/HttpRequest'

export default class SnowdayService extends BasicService {

    private _zip: string

    constructor(config: any) {
        super('*/15 * * * *')
        this._zip = config.location.zip
    }

    makeHttpRequest() {
        return new SnowdayRequest(this._zip)
    }
}

class SnowdayRequest extends HttpRequest<any> {

    private _url: string

    constructor(zip: string) {
        super()
        this._url = `http://www.snowdaycalculator.com/prediction.php?zipcode=${zip}&snowdays=0&extra=0`
    }

    public getData(): Promise<any> {
        return this.getHtml(this._url).then(this.parseStatus)
    }

    private parseStatus(html: string) {
        const pattern = /theChance\[([0-9]+)\]\W?=\W?([-\.0-9]+)/g;
        let status = []
        let match;
        while ((match = pattern.exec(html)) != null) {
            let date = moment(match[1], 'YYYYMMDD').toDate();
            let prediction = parseFloat(match[2]);
            let day = moment(date).format('YYYYMMDD');

            let info = {
              day,
              chance: prediction
            }

            status.push(info)
        }
        return status;
    }
}
