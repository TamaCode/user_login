const express = require('express');
const port = 3000;

// Server Up
const app = express();
app.listen(3000, () => console.log(`Server running on port ${port}`));

// Server Static Files
app.use(express.static('public'));

// Routes
app.get('/', (req, res) => {
  res.sendFile('./views/index.html', { root: __dirname });
});

app.get('/about', (req, res) => {
  res.sendFile('./views/about.html', { root: __dirname });
});

app.get('/register', (req, res) => {
  res.sendFile('./views/register.html', { root: __dirname });
});

app.use((req, res) => {
  res.sendFile('./views/error404.html', { root: __dirname })
});
