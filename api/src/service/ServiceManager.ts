import Service from '~/service/Service'
import cron from 'node-cron'

export interface ServiceInstance {
    path: string
    service: Service
}

export default class ServiceManager {

    private _services: ServiceInstance[]

    constructor() {
        this._services = []
    }

    public addService(service: Service, path: string): void {
        let instance = { service: service, path: path }
        this._services.push(instance)
    }

    private registerCron(service: Service, cronExpression: string): void {
        cron.schedule(cronExpression, service.update)
    }

    get services() {
        return this._services
    }
}
