const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./routers/user');
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
  res.sendFile(path.join(__dirname, '../views/index.html'));
});

app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/about.html'));
});

app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/register.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/login.html'));
});

// User Routes Data Base
app.use(userRouter);

app.use((req, res) => {
  res.sendFile(path.join(__dirname, '../views/error404.html'))
});
