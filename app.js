const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:

hbs.registerPartials(__dirname + '/views/partials');

// Add the route handlers here:

app.get('/', (request, response, next) => {
  response.render('home');
});

app.get('/beers', (request, response, next) => {
  punkAPI
    .getBeers()
    .then(beers => {
      console.log('The response from the api:', beers);
      response.render('beers', { beers });
    })
    .catch(error => console.log(error));
});

app.get('/random-beer', (request, response, next) => {
  punkAPI
    .getRandom()
    .then(randomBeer => {
      const theRandomBeer = punkAPI.getRandom();
      theRandomBeer.then(beer => {
        response.render('random-beer', { beer });
      });
    })
    .catch(error => console.log(error));
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
