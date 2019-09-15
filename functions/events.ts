import moment from 'moment'
import {getHtml} from "./util/HttpRequest";

const urls: string[] = [
    // good to know
    'http://www.webcal.fi/cal.php?id=221&format=json&start_year=current_year&end_year=current_year&tz=America%2FDenver',
    // holidays
    'http://www.webcal.fi/cal.php?id=52&format=json&start_year=current_year&end_year=current_year&tz=America%2FDenver',
    // end of the world
    'http://www.webcal.fi/cal.php?id=107&format=json&start_year=current_year&end_year=current_year'
];

export interface Event {
    date: string
    name: string
    description: string
}

export async function handler(): Promise<any> {
    const data = await getData();
    return {
        statusCode: 200,
        body: JSON.stringify(data)
    }
}

async function getData(): Promise<Event[]> {
    const promises = urls.map(getHtml);
    return await Promise.all(promises).then(flattenJson);
}

function flattenJson(json: any[]): Event[] {
    let output: Event[] = [];
    for (const jsonArray of json) {
        for (const eventJson of jsonArray) {
            const event = makeEvent(eventJson);
            if (isEventToday(event)) {
                output.push(event)
            }
        }
    }

    return output
}

function makeEvent(json: any): Event {
    return {
        date: json.date,
        name: json.name,
        description: json.description
    }
}

function isEventToday(event: Event): boolean {
    let now = moment();
    let eventTime = moment(event.date, 'YYYY-MM-DD');
    return eventTime.isSame(now, 'day');
}
