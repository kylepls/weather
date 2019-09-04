import moment from 'moment'
import HttpRequest from '~/util/HttpRequest'
import BasicService from '~/service/BasicService';

export default class FactService extends BasicService {

    constructor() {
        super('1 0 * * *')
    }

    makeHttpRequest() {
        return new FactsRequest()
    }
}


class FactsRequest extends HttpRequest<any> {

    public getData(): Promise<any> {
        return this.getHtml(this.makeUrl()).then(data => {
          return [ data ]
        })
    }

    private makeUrl(): string {
        let now = moment()
        let month: number = now.get('month') + 1
        let day: number = now.date()
        return `http://numbersapi.com/${month}/${day}/date`
    }
}
