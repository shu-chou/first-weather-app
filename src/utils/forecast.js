const request = require('request');
const forecast = (lat, long, callback) => {

        setTimeout(() => {
            const url = 'https://api.darksky.net/forecast//'+lat+','+long;
            request({ url: url, json: true }, (error, response) => {
                if (error){
                    callback({ error: 'Error'}, undefined)
                }else{
                    try {
                        callback(undefined, {
                           temp: response.body.currently.temperature,
                           weath: response.body.hourly.summary
                        });
                    } catch (e) {
                        callback({ error: 'Couldnt find what you were looking for'}, undefined);
                    }
                }
            });
        }, 2000);


};

module.exports = forecast;