const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const router = require('express').Router();

mongoose.connect('mongodb://127.0.0.1/lpg', { poolSize: 10});

const cors = require('cors');

const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

app.use(cors());

const mainRoutes = require('./routes/getPlates')

app.use(mainRoutes)

app.listen(8000, () => {
  console.log('Node.js listening on port ' + 8000)
})