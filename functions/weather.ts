import {APIGatewayEvent} from 'aws-lambda';

const DarkSky = require('dark-sky');
const limiter = require('lambda-rate-limiter')({
  interval: 60 * 60 * 1000,
  uniqueTokenPerInterval: 500,
});

require('dotenv').config();

interface Coordinates {
  latitude: number,
  longitude: number
}

const key = process.env.DARK_SKY;
const dev = process.env.DEV;
if (!key) {
  throw Error('No DARK_SKY key found');
}

const darksky = new DarkSky(key);

export async function handler(event: APIGatewayEvent): Promise<any> {
  if (!dev) {
    const ip = event.headers['x-forwarded-for'];
    try {
      await limiter.check(20, ip);
    } catch (e) {
      return {
        statusCode: 429,
      };
    }
  }

  const body = JSON.parse(event.body || '');
  const coords: Coordinates = body as Coordinates;

  if (coords.latitude === undefined || coords.longitude === undefined) {
    return {
      statusCode: 400,
    };
  } else {
    const data = await getData(coords);
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  }
}

async function getData(coords: Coordinates): Promise<any> {
  return new Promise((resolve, reject) => {
    darksky.coordinates({
      lat: coords.latitude,
      lng: coords.longitude,
    }).get().then(resolve).catch(reject);
  });
}
