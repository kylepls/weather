import BasicService from '~/service/BasicService';
import EventsRequest from './EventsRequest'

export default class EventService extends BasicService {

    constructor() {
        super('*/30 * * * *')
    }

    makeHttpRequest() {
        return new EventsRequest()
    }
}
