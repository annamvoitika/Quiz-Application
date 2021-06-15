const mongoose = require('mongoose');
const bcrypt = require('bcrypt'),
  SALT_WORK_FACTOR = 10;

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    permission: String,
}, { collection: 'users' });

userSchema.pre('save', function(next) {
    const user = this;
    if (!user.isModified('password')) return next();

    bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
        if (err) return next(err);

        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) return next(err);

            user.password = hash;
            next();
        });
    });
});

userSchema.methods.comparePassword = function (userPassword, callback) {
    bcrypt.compare(userPassword, this.password, function (err, isMatch) {
      if (err) return callback(err);
      callback(undefined, isMatch);
    });
  };

const User = mongoose.model('User', userSchema, 'users');
module.exports = User;