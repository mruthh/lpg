const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');
const mongoose = require('mongoose');
const User = mongoose.model('users');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  done(null, id)
});


passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientId,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback'
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({googleId: profile.id}, (err, res) => {
        if (err) throw err;
      });
      if (existingUser) {
        done(null, existingUser)
      } else {
        User.create({googleId: profile.id, googleDisplayName: profile.displayName}, (err, user) => {
          if (err) throw err;
          done(null, user)
        })
      }
    }
  )
);