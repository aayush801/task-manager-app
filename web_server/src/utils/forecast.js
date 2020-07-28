const request = require('postman-request');

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=3ce4c426d3b88082f13b045241b419ba&query=' + longitude + ',' + latitude;
    request({url: url, json: true}, (error, {body }) => {
        if (error) {
            callback('Unable to connect to weather service!',undefined)
        } else if (body.error) {
            callback('unable to find location',undefined)
        } else {
            callback(undefined, body.location.name + 'the local time is ' + body.location.localtime + '. It is currently ' + body.current.temperature + ' degress out.' +  'There is a ' + body.current.precip + '% chance of rain.' +
                ' The weather currently is ' + body.current.weather_descriptions)

        }
    })
}

module.exports =  forecast