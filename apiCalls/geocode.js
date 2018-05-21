const request = require('request');
const key = require('../config');

const geocodeAddress = (unencodedAddress) => {
    return new Promise((resolve, reject) => {
        request({
            url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${key.geocodeKey}`,
            json: true,
            method: 'GET'
        }, (error, response, body) => {
            if (error) {
                reject('Unable to connect to Google Servers.');
            } else if (body.status === 'OK') {
                resolve({
                    address: body.results[0].formatted_address,
                    lattitude: body.results[0].geometry.location.lat,
                    longitude: body.results[0].geometry.location.lng
                })
            } else {
                reject('No Address was found for the information provided.');
            }
            
        });
    })
}


module.exports = {
    geocodeAddress
};


