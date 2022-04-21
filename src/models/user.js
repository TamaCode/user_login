const mongoose = require('mongoose');
const { isEmail } = require('validator');
const { Schema } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, 'Enter an username'],
    unique: true,
    minlength: [5, 'The minimum length for username is 5 characters']
  },
  password: {
    type: String,
    required: [true, 'Enter a password'],
    minlength: [8, 'The minimum length for password is 8 characters']
  },
  email: {
    type: String,
    required: [true, 'Enter an email'],
    unique: true,
    validate: [isEmail, 'Please, enter a valid email']
  }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;