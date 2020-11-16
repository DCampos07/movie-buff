const router = require('express').Router();
const sequelize = require('../config/connection');
const axios = require('axios');
const { Post, User, Comment } = require('../models');

router.get('/', (req, res) => {
  res.render('homepage', {
    loggedIn: req.session.loggedIn
  });

  axios.get("http://www.omdbapi.com/?t=Toy+Story&apikey=d69ff318")  
      .then(function (response) {
          console.log(response)
              const movies = {
                  title: response.data.Title,
                  poster: response.data.Poster
              }
              res.json(movies);
              console.log(movies);
          })
          .catch(function (error) {
              // handle error
              console.log(error);
          })
          .then(function () {
              // always executed
          });
});

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
      res.redirect('/');
      return;
  }
  res.render('login');

});

router.get('/signup', (req, res) => {
  res.render('signup');
});

module.exports = router;