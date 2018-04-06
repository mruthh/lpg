const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const router = require('express').Router();
const cookieSession = require('cookie-session');
const passport = require('passport')
const keys = require('./config/keys');
require('./models/User');
require('./services/passport');
mongoose.connect(keys.mongoURI, { poolSize: 10});

const cors = require('cors');

const app = express();

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);

app.use(passport.initialize());
app.use(passport.session());

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