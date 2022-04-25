const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const router = new express.Router();

// REGISTER
router.post('/user', (req, res) => {
  const newUserData = req.body;
  const newUser = new User(newUserData);

  newUser.save().then((result) => {
    console.log('User saved successfuly', result);
    res.redirect('/');
  }).catch((err) => {
    console.log('User cannot be save.', err.message, err.code);
    const responseObj = { errorMessages: handleErrors(err) };
    res.send(responseObj);
  });
});

// HOME
router.get('/user', (req, res) => {
  User.find().then((usersData) => {
    res.send(usersData);
  }).catch((err) => {
    console.log('Cannot connect to DB', err);
  });
});

// LOGIN
router.get('/user/:username&:password', (req, res) => {
  const username = req.params.username;
  const passwordValue = req.params.password;

  validateUserCredentials(username, passwordValue).then((validateResult) => {
    res.send({ validateResult });
  }).catch((err) => {
    console.log('Cannot connect to DB or Cannot unhashing password', err);
  });
});

const validateUserCredentials = async (username, passwordValue) => {
  let validateResult;
  const userData = await User.findOne({ username });

  if (userData) {
    validateResult = await bcrypt.compare(passwordValue, userData.password) ? 'Logged In' : 'Bad Credentials';
  } else {
    validateResult = 'User not found';
  }

  return validateResult;
};

const handleErrors = (error) => {
  let errorMessage = '';

  if (error.message.includes('User validation failed')) {
    const invalidFields = Object.keys(error.errors);

    invalidFields.forEach((invalidField) => {
      errorMessage += `${error.errors[invalidField].properties.message}\n`;
    });

  } else if (error.code === 11000) { // Error de duplicidad
    const fieldDuplicated = Object.keys(error.keyValue);
    errorMessage = `The entered ${fieldDuplicated[0]} is already registered.`;
  }

  return errorMessage;
};

module.exports = router;