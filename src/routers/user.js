const express = require('express');
const User = require('../models/user');
const router = new express.Router();

router.post('/user', (req, res) => {
  const newUserData = req.body;
  const newUser = new User(newUserData);

  newUser.save().then((result) => {
    console.log('User saved successfuly', result);
    res.redirect('/');
  }).catch((err) => {
    console.log('User cannot be save', err);
  });
});

router.get('/user', (req, res) => {
  User.find().then((usersData) => {
    res.send(usersData);
  }).catch((err) => {
    console.log('Cannot connect to DB', err);
  });
});

router.get('/user/:username', (req, res) => {
  const username = req.params.username;
  User.findOne({ username }).then((userData) => {
    res.send(userData);
  }).catch((err) => {
    console.log('Cannot connect to DB', err);
  });
});

module.exports = router;