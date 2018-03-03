var express = require('express');
var router = express.Router();
var User = require('../models/user');

// GET /
router.get('/', function(req, res, next) {
  return res.render('index', { title: 'Home' });
});

// GET /register
router.get('/register', function(req, res, next){
  return res.render('register', { title: 'Register' });
});

// POST /register
router.post('/register', function(req, res, next){
  // check if all fields have been entered
  if(req.body.email &&
    req.body.name &&
    req.body.favoriteBook &&
    req.body.password &&
    req.body.confirmPassword){
      // all fields = true
      // check if passwords match
      if(req.body.password !== req.body.confirmPassword){
        var err = new Error('Passwords do not match.');
        err.status = 400;
        return next(err);
      }
      // all fields = true, passwords match = true
      // create oblect with form input
      var userData = {
        email: req.body.email,
        name: req.body.name,
        favoriteBook: req.body.favoriteBook,
        password: req.body.password
      }

      // use schema's 'create' method to insert the object into mongoDB
      User.create(userData, function(error, user){
        if(error){
          return next(err);
        }else{
          return res.redirect('/profile');
        }
      });
    }else{
      // all fields = false
      var err = new Error('All fields required.');
      err.status = 400;
      return next(err);
    }
});

// GET /about
router.get('/about', function(req, res, next) {
  return res.render('about', { title: 'About' });
});

// GET /contact
router.get('/contact', function(req, res, next) {
  return res.render('contact', { title: 'Contact' });
});

module.exports = router;
