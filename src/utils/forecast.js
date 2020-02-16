const request = require('request');
const fahrenheitToCelsius = require('fahrenheit-to-celsius');

//
// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)
const forecast = (lat, long, callback) => {

        setTimeout(() => {
            const url = 'https://api.darksky.net/forecast/13dfccc8f0f89c7f0d9138c749e61904/'+lat+','+long;
            request({ url: url, json: true }, (error, response) => {
                if (error){
                    callback({ error: 'Error'}, undefined)
                }else{
                    try {
                        callback(undefined, response.body.currently.temperature)
                        console.log(response.body);
                    } catch (e) {
                        callback({ error: 'Couldnt find what you were looking for'}, undefined);
                    }
                }
            });
        }, 2000);


};

module.exports = forecast;