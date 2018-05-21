// NPM Modules
const request = require('request');
const yargs = require('yargs');

// Our Modules
const geocode = require('./apiCalls/geocode');
const keys = require('./config');
const weatherApi = require('./apiCalls/weatherCall');


const argv = yargs
    .options({
        a: {
            demand: true,
            alias: 'address',
            describe: 'Address to fetch weather',
            string: true
        }
    })
    .help()
    .alias('help', 'h')
    .argv;

geocode.geocodeAddress(argv.address, (errorMessage, results) => {
    if (errorMessage) {
        console.log(errorMessage);
    } else {
        console.log(JSON.stringify(results, null, 2));
        weatherApi.fetchWeather(results, (errorMessage, weatherResults) => {
            if (errorMessage) {
                console.log(errorMessage);
            } else {
                console.log(`Current Temperature: ${weatherResults.temperature}`);
                console.log(`Feels Like: ${weatherResults.feelsLike}`);
            }
        });
    }
})




