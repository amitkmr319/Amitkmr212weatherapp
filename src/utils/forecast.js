const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=6647c72cfc8729fa9bf634d7599d0cf3&query=' + latitude + ',' + longitude
    //const url = 'http://api.weatherstack.com/current?access_key=6647c72cfc8729fa9bf634d7599d0cf3&query=' + '!'
    request({ url, json: true }, (error, { body } = {}) => {
        if (error)
        {
            callback('Can not connect to the forecast server.', undefined)
        }
        else if (body.error)
        {
            callback('Unable to fetch the data. Please check the address.')
        }
        else
        {
            callback(undefined, `${body.current.weather_descriptions[0]}. Currently it is ${body.current.temperature} degrees in ${body.location.name}. Chance of rain is ${body.current.precip}%. The wind speed will be ${body.current.wind_speed} and humidity will be ${body.current.humidity}%.`)
        }
    })
}
module.exports = forecast