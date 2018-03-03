var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  favoriteBook: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  }
});

// hash password before saving to mongoDB
UserSchema.pre('save', function(next){
    var user = this;
    bcrypt.hash(user.password, 10, function(err, hash){
       if(err){
           return next(err);
       }
       user.password = hash;
       next(); 
    });
});

var User = mongoose.model('User', UserSchema);
module.exports = User;