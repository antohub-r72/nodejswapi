const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const publicPath = path.join(__dirname,'../public')
const viewsPath =  path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicPath))

app.get('',(req,res) => {
    //res.send('Hello dodo')
    res.render('index', {
        title: 'Weather App',
        name: 'Anto R'
    })
})

/*app.get('/help',(req,res) => {
    res.send('In help')
})

app.get('/about',(req,res) => {
    res.send('<h1> In About </h1>')
})*/

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Anto R'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Anto R'
    })
})

app.get('/weather',(req,res) => {
    if (!req.query.address) {
        return res.send(
            {
                error:"You must provide the address"
            }
        )
    }
    geocode(req.query.address, (error, { latitude, longitude, location }={}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/products',(req,res) => {
    console.log(req.query)
    if (!req.query.search) {
        return res.send(
            {
                error:"Please provide the searh key"
            }
        )
    }
    res.send(
        {
            products: []
        }
    )
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Anto R',
        errorMessage: 'Help article not found.'
    })
})

app.get('*',(req,res) => {
    //res.send('Hello dodo')
    res.render('404', {
        title: '404',
        errorMessage: 'Page not found.',
        name: 'Anto R'
    })
})



app.listen(3000,() => {
    console.log("Staring @3000")
})