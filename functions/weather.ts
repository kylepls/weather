import {APIGatewayEvent} from "aws-lambda";
import {Coordinates} from "./earthquakes";

const DarkSky = require('dark-sky');
const key = process.env.DARK_SKY;
if (!key) {
    throw Error("No DARK_SKY key found")
}
const darksky = new DarkSky(key);

export async function handler(event: APIGatewayEvent): Promise<any> {
    const body = JSON.parse(event.body || "");
    const coords: Coordinates = body as Coordinates;
    console.log("Get weather for " + JSON.stringify(coords));
    const data = await getData(coords);
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
        }).get().then(resolve).catch(reject);
    });
}
