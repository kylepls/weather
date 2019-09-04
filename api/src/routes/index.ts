import {Request, Response, NextFunction} from "express";

export default class Index {
    public execute(req: Request, res: Response, next: NextFunction) {
        //render page
        res.send({
            "message": "Hello To World!"
        })
    }
}
