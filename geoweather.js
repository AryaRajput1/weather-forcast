const request = require('request');
const hero=undefined;
module.exports={
    name:'arya',
    getLocation:getLocation,
    getWeather:getWeather,
}

//get weather
function getWeather(name,callback) {
    const wurl = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=f1c199a5b22195ff5eef46cf42d022b8`;
    request({ url: wurl }, (error, response) => {
        if (error) {
            callback('network problem please check or try some time later',undefined);
            
        }
        else {
            const data = JSON.parse(response.body);
          
            if (data.main) {
                 callback(undefined,{
                     lon:data.coord.lon,
                     lat:data.coord.lat,
                        temp:data.main.temp - 273,
                        temp_min:data.main.temp_min - 273,
                        temp_max:data.main.temp_max - 273,
                        sky:data.weather[0].main
                    })
                  
                    
                }
                else if(data.cod==404) {
                    callback('no such location please insert approprate locations',undefined);
                }
            else {
                callback('enter location please',undefined);
            }
        }
    })
}

//get location at specified latitude longitude
function getLocation(lat, long,callback) {
    const geourl = `https://us1.locationiq.com/v1/reverse.php?key=54a2731c0701bf&lat=${lat}&lon=${long}&format=json`;
    request({ url: geourl }, (error, response) => {
        if (error) {
            callback('network problem please check or try some time later',undefined);
        }
        else {
            const data = JSON.parse(response.body);
            
            if (data.display_name) {
               
                    callback(undefined,data.display_name);
            }
            else {
                callback('enter latitude and longitude',undefined);
            }
        }
    })
}