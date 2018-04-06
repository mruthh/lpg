const express = require('express');
const router = require('express').Router();
const passport = require('passport')
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

//possible issue - using router instead of app/express.

mongoose.connect('mongodb://127.0.0.1/lpg', { poolSize: 10});

router.get('/auth/google',
  passport.authenticate('google', {
    scope: ['profile', 'email']
  })
);

router.get('/auth/google/callback', passport.authenticate('google'),
  (req, res) => {res.redirect('/');
});

module.exports = router;