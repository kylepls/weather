import moment from 'moment'
import HttpRequest from '~/util/HttpRequest'
import BasicService from '~/service/BasicService';

interface RocketLaunch {
    name: string
    time: Date
}

export default class RocketService extends BasicService {

    constructor() {
        super('1 0 * * *')
    }

    makeHttpRequest() {
        return new RocketRequest()
    }
}

class RocketRequest extends HttpRequest<RocketLaunch[]> {
    private readonly URL = 'https://launchlibrary.net/1.3/launch';

    public async getData(): Promise<RocketLaunch[]> {
        return this.getHtml(this.URL).then(jsonObject => {
            return jsonObject.launches.map(RocketRequest.parseLaunch)
        })
    }

    private static parseLaunch(launchJson: any): RocketLaunch {
        let timeString: string = launchJson.net
        timeString = timeString.substr(0, timeString.length-4)
        const time = moment.utc(timeString, 'MMMM D YYYY HH:mm:ss').local()

        return {
            name: launchJson.name,
            time: time.toDate()
        }
    }
}
