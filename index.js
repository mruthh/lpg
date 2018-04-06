const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const router = require('express').Router();
require('./services/passport')
mongoose.connect('mongodb://127.0.0.1/lpg', { poolSize: 10});

const cors = require('cors');

const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

app.use(cors());

const mainRoutes = require('./routes/getPlates');
const authRoutes = require('./routes/authRoutes');
app.use(mainRoutes);
app.use(authRoutes);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log('Node.js listening on port ' + PORT)
})