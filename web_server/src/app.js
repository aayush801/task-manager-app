const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()
const port = process.env.PORT || 3000;
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Aayush bhatt'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Aayush Bhatt'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: "Help",
        name: "aayush bhatt",
        helpText: 'This is some helpful text.'
    })
});

app.get('/weather', (req,res) => {
    if(!req.query.address){
        return res.send('no address')
    }
    geocode(req.query.address, (error,{latitude, longitude, location} = {}) => {

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error : error
                })
            }
            res.send({
                location: location,
                forecast: forecastData
            })
        })
    })
});

app.get('/help/*', (req, res) => {
    res.render('error_page', {
            title: "404 ERROR",
            name: "aayush",
            error: "help page non-existent"
        }
    )
})


app.get('*', (req, res) => {
    res.render('error_page', {
        title: "404 ERROR",
        name: "aayush",
        error: "page does not exist"
    })
});



app.listen(port, () => {
    console.log('Server is up on port ' + port)
})