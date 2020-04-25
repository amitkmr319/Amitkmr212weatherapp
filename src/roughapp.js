const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

geocode(process.argv[2], (error, {location, latitude, longitude} = {}) =>
{
    if (error)
    {
        console.log(error);
    }
    else
    {
        forecast(latitude, longitude, (error, data) =>
        {
            if (error)
            {
                console.log(error);
            }
            else
            {
                console.log(location);
                console.log(data);
            }
        })
    }
})