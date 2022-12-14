const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const WORK_FACTOR = 10;
//currently, the database stores a collection of User documents, where each user has a name and an object of parks visited.

//parks visited: {park_code: {details: , activities: , notes: }, date_visited: ...}
const userSchema = mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    parksVisited: {}
  },
  { minimize: false } //lets you initialize parksVisited as empty, because by default MongoDB doesnt allow for empty objects as values
);

//this will bcrypt hash the password anytime a user document is created - so upon sign up - before saving that document to the data base
userSchema.pre('save', function(next){
  const user = this;
  bcrypt.hash(user.password, WORK_FACTOR).then((hash) =>{
    user.password = hash;
    return next();
  }).catch(err => {
    return next('Error in hashing of userController.createUser: ' + JSON.stringify(err));
  })
})

module.exports = mongoose.model('user', userSchema);
