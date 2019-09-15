import {APIGatewayEvent} from "aws-lambda";
import moment from 'moment'
import {getHtml} from "./util/HttpRequest";

export interface EarthquakeEvent {
    place: string
    time: number
    magnitude: number
}

export interface Coordinates {
    latitude: number,
    longitude: number
}

export async function handler(event: APIGatewayEvent): Promise<any> {
    const body = JSON.parse(event.body || "");
    const coords: Coordinates = body as Coordinates;
    const data = await getData(coords);
    return {
        statusCode: 200,
        body: JSON.stringify(data)
    }
}

async function getData(coords: Coordinates) {
    return formatHttpData(await getHtml(makeUrl(coords)));
}

function makeUrl(coords: Coordinates): string {
    let time = moment().subtract(2, 'days').format('YYYY-MM-DD');
    return `http://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=${time}&latitude=${coords.latitude}&longitude=${coords.longitude}&maxradiuskm=750`;
}

function formatHttpData(input: any): EarthquakeEvent[] {
    return input.features.map((feature: any) => {
        return {
            place: feature.properties.place,
            time: feature.properties.time,
            magnitude: feature.properties.mag,
        };
    });
}
