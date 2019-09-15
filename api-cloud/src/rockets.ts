import moment from "moment"
import {getHtml} from "./util/HttpRequest";

const URL = 'https://launchlibrary.net/1.3/launch';

interface RocketLaunch {
    name: string
    time: Date
}

export async function handler(): Promise<any> {
    const data = await getData();
    return {
        statusCode: 200,
        body: JSON.stringify(data)
    }
}

async function getData(): Promise<RocketLaunch[]> {
    return getHtml(URL).then((obj: any) => obj.launches.map(parseLaunch));
}

function parseLaunch(launchJson: any): RocketLaunch {
    let timeString: string = launchJson.net;
    timeString = timeString.substr(0, timeString.length - 4);
    const time = moment.utc(timeString, 'MMMM D YYYY HH:mm:ss').local();

    return {
        name: launchJson.name,
        time: time.toDate()
    }
}
