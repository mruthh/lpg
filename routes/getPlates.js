const express = require('express');
const router = require('express').Router();

const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const LicensePlate = require('../models/LicensePlate');
// const LicensePlateSchema = require('../models/LicensePlate');

const aggregate = LicensePlate.aggregate(
  { $project: { baseSolutionsCount: {$gt: 0} } },
);

mongoose.connect('mongodb://127.0.0.1/lpg', { poolSize: 10});

const defaultGameSize = 10;
//Use this route to request a set of license plates for a game. Can specify a gamesize parameter in query; otherwise will default to defaultGameSize.

router.get('/api/licenseplates', (req, res, next) => {
  //get pseudorandom sample of #gamesize number of license plates
  let gameSize = parseInt(req.query.gamesize) || defaultGameSize;
  aggregate.sample(gameSize).exec((err, results) => {
    if (err) throw err;
    res.send(results);
  });
})

module.exports = router;