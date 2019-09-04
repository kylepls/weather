import express from 'express'
import * as ex from 'express'

export default class Server {
    private _app: ex.Application
    private _router: ex.Router

    constructor() {
        this._app = express();
        this._router = ex.Router()
        this._app.use('/', this._router);
    }

    public start(host: string, port: string) : void {
        this._app.listen(port, host);
    }

    public addRoute(path: string, handler: ex.Handler) : void {
        this._router.get(path, handler)
    }
}
