# A Weather App
A no-nonsense SPA for showing weather in your area.

[![Netlify Status](https://api.netlify.com/api/v1/badges/8b434a4f-ea13-4b7b-a98e-efd7cb7fd1d0/deploy-status)](https://app.netlify.com/sites/weather-app-kyle/deploys)

![demo](https://i.imgur.com/iaN9EKK.png)

---

### About

##### The Basics

This is a super simple webapp that shows you the weather and some other neat things. It is designed so that it can be run 24/7 on a display. 

There are some nice little details:

* The wind icon will make a blowing animation if it is windy outside.
* The compass points in the direction of the wind.
* The thermometer changes color and height depending on the temperature.
* The cloud will either rain or snow if percipitation is occurring.

<img src="https://weather.kyle.in/header-icons/wind-blowing.svg" alt="drawing" width="200" height="200" />

Currently all data for the app is pulled from [darksky.net](https://darksky.net)

##### Deployment

The site is hosted by [Netlify](https://www.netlify.com/). Backend requests are built using [Netlify Functions](https://www.netlify.com/docs/functions/)

Netlify is an amazing platform that makes the deveopment and deployment of this application so simple. If you haven't already, you should check it out.

If you want to run the application on a machine with a cursor add /kiosk to the URL. This will hide the cursor on the webpage.

---

### Host it yourself

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/kylepls/weather)

All you have to do is click the button. Sorta... 

Just make sure to set the the `DARK_SKY` environment variable to your DarkSky key in the Environment configuration tab (in Netlify).
