/* 
------------static file-------------
htmlfilepath is path of static file folder
app.use(express.static(htmlfilepath));
*/

//require modules
const express = require('express');
const geo = require('./geoweather');
const getWeather = geo.getWeather;
const getLocation = geo.getLocation;
//port config
const port =process.env.PORT||3000;
//this for start server
const app = express();
const path = require('path');
const hbs = require('hbs');// 


// set views with another name 
const viewspath = path.join(__dirname, './templates');
app.set('views', viewspath);
const staticpath = path.join(__dirname, './static');
app.use(express.static(staticpath));

//set partials htmls in form of hbs
const partialpath = path.join(__dirname, './partials');
hbs.registerPartials(partialpath);



//set view engine for dynamic files
app.set('view engine', 'hbs');

//following are for specific urls

//this for  fetch data
app.get('/product/', (req, res) => {
if (req.query.addresss) {
        getWeather(req.query.addresss, (err, resp) => {
            if (err) {
                res.send({
                    "error": err
                })
}
            else {
                getLocation(resp.lat, resp.lon, (error, response) => {
                    if (error) {
                        res.send({
                            "error": error
                        })
                    }
                    else {
                        if (resp.error) {
                            res.send(
                                JSON.parse(resp)
                            )
                        }
                        else {
 res.send(
                                {
                                    "temp": resp.temp,
                                    "temp_max": resp.temp_max,
                                    "temp_min": resp.temp_min,
                                    "sky": resp.sky,
                                    "location": response,
                                }
                            )
                        }
}
                });
            }
        })
    }
}
);

// this for home
app.get('', (req, res) => {

    res.render('home', {
        title: 'home'
    });
})
//this for about
app.get('/about', (req, res) => {

    res.render('about', {
        title: 'About'
    });
})
//this for help
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'help'
    });
})


//this for listen or start server
app.listen(port, () => {
    console.log('connect to localhost server');
});



