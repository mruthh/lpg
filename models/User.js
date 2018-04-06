const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  googleId: String,
  googleDisplayName: String,
  gameSettings: {},
  wordHistory: [{}]
});

mongoose.model('users', userSchema);