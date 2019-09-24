import {APIGatewayEvent} from 'aws-lambda';
import {Coordinates} from './earthquakes';

const DarkSky = require('dark-sky');
require('dotenv').config();

const key = process.env.DARK_SKY;
const dev = process.env.DEV;
if (!key) {
  throw Error('No DARK_SKY key found');
}

const limiter = require('lambda-rate-limiter')({
  interval: 60 * 60 * 1000,
  uniqueTokenPerInterval: 500,
});

const darksky = new DarkSky(key);

export async function handler(event: APIGatewayEvent): Promise<any> {
  console.log('HEADERS: ' + JSON.stringify(event.headers));
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
  const data = await getData(coords);
  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
}

async function getData(coords: Coordinates): Promise<any> {
  return new Promise((resolve, reject) => {
    darksky.coordinates({
      lat: coords.latitude,
      lng: coords.longitude,
    }).get().then(resolve).catch(reject);
  });
}

function getSourceIp(requestContext) {
  if (requestContext) {
    return requestContext.identity.sourceIp;
  } else {
    throw Error('Could not get source IP');
  }
}
