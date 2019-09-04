import moment from 'moment'
import HttpRequest from '~/util/HttpRequest'

const urls: string[] = [
    // good to know
    'http://www.webcal.fi/cal.php?id=221&format=json&start_year=current_year&end_year=current_year&tz=America%2FDenver',

    // holidays
    'http://www.webcal.fi/cal.php?id=52&format=json&start_year=current_year&end_year=current_year&tz=America%2FDenver',

    // end of the world
    'http://www.webcal.fi/cal.php?id=107&format=json&start_year=current_year&end_year=current_year'
 ]

export interface Event {
    date: string
    name: string
    description: string
}

export default class EventRequest extends HttpRequest<Event[]> {

    public getData(): Promise<any> {
        let promises = urls.map(url => {
            return this.getHtml(url)
        })

        return Promise.all(promises).then(this.flattenJson)
    }

    private flattenJson(json: any[]): Event[] {
        let output: Event[] = []

        for (let jsonArray of json) {
            for (let eventJson of jsonArray) {
                let event = EventRequest.makeEvent(eventJson)
                if (EventRequest.isEventToday(event)) {
                    output.push(event)
                }
            }
        }

        return output
    }

    private static makeEvent(json: any): Event {
        return {
            date: json.date,
            name: json.name,
            description: json.description
        }
    }

    private static isEventToday(event: Event): boolean {
        let now = moment()
        let eventTime = moment(event.date, 'YYYY-MM-DD')
        return eventTime.isSame(now, 'day')
    }
}
