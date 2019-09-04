require('module-alias/register')

import * as ex from 'express'
import Zipcodes from 'zipcodes'

import Server from '~/Server'
import Service from '~/service/Service'
import ServiceManager from './service/ServiceManager';

import Index from '~/routes/index'

import config from '~/../config/config.json'
import SnowdayService from '~/routes/snowday/SnowdayService'
import EarthquakeService from '~/routes/earthquakes/EarthquakeService'
import FactService from '~/routes/facts/FactsService';
import EventsService from '~/routes/events/EventsService';
import RocketService from '~/routes/rockets/RocketService'
import WeatherHourlyService from '~/routes/weather/WeatherHourlyService'
import WeatherCurrentService from '~/routes/weather/WeatherCurrentService'
import WeatherDayService from '~/routes/weather/WeatherDayService'

import SolarService from './routes/planets/SolarService'
import WeatherAlertService from './routes/weather/WeatherAlertService';

const port = process.env.PORT || '8000'
const host = process.env.ADDR || '127.0.0.1'

const lookup: any = Zipcodes.lookup(config.location.zip)
const lat = lookup.latitude
const lon = lookup.longitude

let server = new Server()
server.start(host, port)
server.addRoute('/', new Index().execute)

let weatherCredentials = {lat, lon, key: config.weather['weatherbit-key']}

let manager = new ServiceManager()

let snowdayService = new SnowdayService(config)
let earthquakeService = new EarthquakeService(lat, lon)
let factsService = new FactService()
let eventsService = new EventsService()
let rocketsService = new RocketService()
let weatherHourlyService = new WeatherHourlyService(weatherCredentials)
let weatherCurrentService = new WeatherCurrentService(weatherCredentials)
let weatherAlertService = new WeatherAlertService(weatherCredentials)
let weatherDayService = new WeatherDayService(weatherCredentials)
let solarService = new SolarService(lat, lon)

manager.addService(earthquakeService, '/earthquakes')
manager.addService(snowdayService, '/snowday')
manager.addService(factsService, '/facts')
manager.addService(eventsService, '/events')
manager.addService(rocketsService, '/rockets')
manager.addService(weatherHourlyService, '/weatherHourly')
manager.addService(weatherCurrentService, '/weatherCurrent')
manager.addService(weatherAlertService, '/weatherAlerts')
manager.addService(weatherDayService, '/weatherDaily')
manager.addService(solarService, '/solar')

manager.services.forEach(service => {
    registerService(service.service, service.path)
})

function registerService(service: Service, path: string): void {
    service.update();
    server.addRoute(path, serviceToExpress(service))
}

function serviceToExpress(service: Service): ex.Handler {
    return (req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.json(service.data)
    }
}
