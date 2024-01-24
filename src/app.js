const path = require('path')
const express = require('express')
const PORT = 3000;
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const app = express()

// Define paths for express config
const publicDir = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

// Setup handle bars engine
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// setup static resources to serve
app.use(express.static(publicDir))

app.get('', (req,res) =>{
    res.render('index', {
        title:'Weather App',
        name:'Bob lenon',
    })
})
app.get('/help',(req,res) =>{
    res.render('help',
    {
        message:'Get help now!',
        title:'Help'
    })
})


app.get('/about',(req,res) =>{
    res.render('about',{title:'About'})
})


app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({error:'You must provide an address.'})
    }
    
    const address = req.query.address
    
    geocode(address,(error, {latitude,longitude,location} = {}) =>{
        if(!address){
            console.log('No location given')
            return res.send({
                error:'No location given.'
            })
        }
        if(error){
            console.log(error);
            return res.send({
                error
            })
        }
        
        forecast(latitude, longitude, (error , forecastData) =>{
            if(error){
                console.log(error)
                return res.send({
                    error
                })
            }
            // console.log(location);
            // console.log(forecastData);
            
            res.send({
                forecast:forecastData,
                location:location,
                address
            })
        })
    })
})


app.get('/help/*', (req,res)=>{
    res.render('404',{errorMessage:'Help article not found'})
})
app.get('*', (req,res)=>{
    res.render('404',{errorMessage:'Page not found'})
})
app.listen(PORT, () => {
    console.log(`Server is up on port ${PORT}`);
}) 