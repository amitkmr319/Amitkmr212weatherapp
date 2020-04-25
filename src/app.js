const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')
const path = require('path')
const hbs = require('hbs')
const express = require('express')
const app = express()
const port = process.env.PORT || 3000

const publicPath = path.join(__dirname, '../public')
app.use(express.static(publicPath))

const viewsPath = path.join(__dirname, '../templates/views')
app.set('view engine', 'hbs')
app.set('views', viewsPath)

const partialsPath = path.join(__dirname, '../templates/partials')
hbs.registerPartials(partialsPath)

app.get('', (req, res) =>
{
    res.render('index', {
        title: 'Home page',
        name: 'Amit Kumar'
    })
})

app.get('/help', (req, res) =>
{
    res.render('help', {
        title: 'Help page',
        name: 'Amit Kumar',
        helptext: 'Get help from the experts.'
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About page',
        name: 'Amit Kumar',
    })
})
app.get('/weather', (req, res) =>
{
    if (!req.query.address)
    {
        return res.send({error: 'Please provide an address.'})
    }
    geocode(req.query.address, (error, { location, latitude, longitude } = {}) =>
    {
        if (error)
        {
            return res.send({error: 'Can not fetch the geocode data.'})
        }
        else
        {
            forecast(latitude, longitude, (error, data) => {
                if (error)
                {
                    return res.send({ error: 'Can not fetch the forecast data.' })
                }
                else
                {
                    return res.send({
                        location: location,
                        forecast: data
                    })
                }
            })
        }
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Error 404',
        name: 'Amit Kumar',
        errorMessage: 'Page not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Error 404',
        name: 'Amit Kumar',
        errorMessage: 'Page not found.'
    })
})

app.listen(port, () =>
{
    console.log('The server is up on port ' + port + '.')
})