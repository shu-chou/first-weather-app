const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
const fahrenheitToCelsius = require('fahrenheit-to-celsius');
const app = express();

const publicDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialPath = path.join(__dirname, '../templates/partials');
app.set('view engine', 'hbs');
app.set('views', viewsPath);
app.use(express.static(publicDirPath));
hbs.registerPartials(partialPath);

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather app',
        name: 'Shubham'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Shubham'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Shubham'
    });
});

app.get('/weather', (req, res) => {
    const address = req.query.address;
    if(!req.query.address){
        return res.send({
            error: 'Please send an address'
        });
    }

    geocode(address, (error, data) => {
        if(error !== undefined){
            res.send(error);
        }
    
        if(data !== undefined){
         forecast(data[0], data[1], (error, data) => {
            if(error !== undefined){
                res.send(error);
            }
           if(data !== undefined){
              
            res.send({
                address,
                forecast: 'Little chances of rain',
                temperature : 'Current temperature is'+ fahrenheitToCelsius(data)
            });
            }
          });
        }
    });   
});

app.get('/help/*', (req, res) => {
    res.render('404');
});

app.get('*', (req, res) => {
    res.render('404');
});

app.listen(3000, () => {
  console.log('listening on port 3000')
});