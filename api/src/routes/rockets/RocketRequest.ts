import moment from 'moment'
import HttpRequest from '~/util/HttpRequest'

export type RocketLaunch = {
    name: string
    time: number
}

const url = 'https://launchlibrary.net/1.3/launch';

export default class RocketRequest extends HttpRequest<RocketLaunch[]> {

    public async getData(): Promise<RocketLaunch[]> {
        return this.getHtml(url).then(jsonObject => {
            return jsonObject.launches.map(RocketRequest.parseLaunch)
        })
    }

    private static parseLaunch(launchJson: any): RocketLaunch {
        let timeString: string = launchJson.net
        timeString = timeString.substr(0, timeString.length-4)
        let time = moment.utc(timeString, 'MMMM D YYYY HH:mm:ss').local()

        return {
            name: launchJson.name,
            time: time.unix()
        }
    }
}
