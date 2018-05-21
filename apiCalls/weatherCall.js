const keys = require('../config');
const request = require('request');


const fetchWeather = (results, callback) => {
    request({
        url: `https://api.darksky.net/forecast/${keys.weatherKey}/${results.lattitude},${results.longitude}`,
        json: true
    }, (error, response, body) => {
        if (!error && response.statusCode === 200) {
            callback(undefined, {
                temperature: body.currently.temperature,
                feelsLike: body.currently.apparentTemperature
            });
        } else {
            callback('Unable to access weather data');
        }
    })
}

module.exports = {
    fetchWeather
}