const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/user');
const port = 3000;

// Server & DB Up
const app = express();
mongoose.connect('mongodb://localhost:27017/LogIn-Users').then(() => {
  console.log('Connected Successfuly to DB');
  app.listen(3000, () => console.log(`Server running on port ${port}`));
}).catch((err) => {
  console.log('Error to connect to the DB', err);
});

// Server Static Files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true })); // to support URL-encoded bodies

// Routes views
app.get('/', (req, res) => {
  res.sendFile('./views/index.html', { root: __dirname });
});

app.get('/about', (req, res) => {
  res.sendFile('./views/about.html', { root: __dirname });
});

app.get('/register', (req, res) => {
  res.sendFile('./views/register.html', { root: __dirname });
});

app.get('/login', (req, res) => {
  res.sendFile('./views/login.html', { root: __dirname });
});

// Routes Data Base
app.post('/user', (req, res) => {
  const newUserData = req.body;
  const newUser = new User(newUserData);

  newUser.save().then((result) => {
    console.log('User saved successfuly', result);
    res.redirect('/');
  }).catch((err) => {
    console.log('User cannot be save', err);
  });
});

app.get('/user', (req, res) => {
  User.find().then((usersData) => {
    res.send(usersData);
  }).catch((err) => {
    console.log('Cannot connect to DB', err);
  });
});

app.get('/user/:username', (req, res) => {
  const username = req.params.username;
  User.findOne({ username }).then((userData) => {
    res.send(userData);
  }).catch((err) => {
    console.log('Cannot connect to DB', err);
  });
});

app.use((req, res) => {
  res.sendFile('./views/error404.html', { root: __dirname })
});
