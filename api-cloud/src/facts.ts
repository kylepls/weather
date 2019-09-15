import moment from "moment"
import {getHtml} from "./util/HttpRequest";

export async function handler(): Promise<any> {
    const data = await getData();
    return {
        statusCode: 200,
        body: JSON.stringify(data)
    }
}

function getData(): Promise<any> {
    return getHtml(makeUrl()).then(data => [data])
}

function makeUrl(): string {
    let now = moment();
    let month: number = now.get('month') + 1;
    let day: number = now.date();
    return `http://numbersapi.com/${month}/${day}/date`;
}
