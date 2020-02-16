const request = require('request');
const geocode = (placename, callback) => {
    setTimeout(() => {
       const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(placename)+'.json?access_token=MaxNJjlUbR4n8XbJo3YTOw';
       request({ url: url, json: true }, (error, response) => {
           if (error){
               callback({ error: 'Error' }, undefined)
           }else{
               try {
                   callback(undefined, {
                       lat: response.body.features[0].center[1],
                       long: response.body.features[0].center[0],
                       place: response.body.features[0].place_name
                   });
               } catch (e) {
                   callback({ error: 'Couldnt find what you were looking for' }, undefined);
               }
           }
    });
   }, 2000);
};


module.exports = geocode;