import * as r from 'request'
import request from 'request'

const httpHeaders = {
    "User-Agent": "Mozilla/5.0"
}

export default abstract class HttpRequest<T> {

    abstract getData(): Promise<T>

    protected getHtml(url: string): Promise<any> {
        return new Promise((resolve, reject) => {
            request(this.makeRequestOptions(url), (err: any, response: Response, body: any) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(body)
                }
            })
        })
    }

    private makeRequestOptions(url: string): r.OptionsWithUri {
        return {
            uri: url,
            method: 'GET',
            json: true,
            timeout: 10000,
            headers: httpHeaders,
            rejectUnauthorized: false,
            gzip: true
        }
    }
}
