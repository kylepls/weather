import {APIGatewayEvent} from "aws-lambda";
import {Coordinates} from "./earthquakes";

const DarkSky = require('dark-sky');
const darksky = new DarkSky(process.env.DARK_SKY);

export async function handler(event: APIGatewayEvent): Promise<any> {
    const body = JSON.parse(event.body || "");
    const coords: Coordinates = body as Coordinates;
    const data = await getData(coords);
    console.log("D" + data);
    console.log("Data: " + JSON.stringify(data));
    return {
        statusCode: 200,
        body: JSON.stringify(data)
    }
}

async function getData(coords: Coordinates): Promise<any> {
    return new Promise((resolve, reject) => {
        darksky.coordinates({
            lat: coords.latitude,
            lng: coords.longitude
        }).get().then((data: any) => resolve(data));
    });
}
