import * as r from 'request';
import request, {Response} from 'request';

const httpHeaders = {
  'User-Agent': 'Mozilla/5.0',
};

export async function getHtml(url: string) {
  return await new Promise((resolve, reject) => {
    request(makeRequestOptions(url), (err: any, response: Response, body: any) => {
      if (err) {
        reject(err);
      } else {
        resolve(body);
      }
    });
  });
}

function makeRequestOptions(url: string): r.OptionsWithUri {
  return {
    uri: url,
    method: 'GET',
    json: true,
    timeout: 10000,
    headers: httpHeaders,
    rejectUnauthorized: false,
    gzip: true,
  };
}
