const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const authenticateJWT = require('./middleware/authenticateJWT');
const repositoryRoutes = require('./routes/repositories');

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(bodyParser.json());

const users = [
  { id: 1, username: 'user1', password: 'password1' },
  { id: 2, username: 'user2', password: 'password2' }
];

// Local time
app.get('/time', (req, res) => {
  const options = { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric', 
    hour: '2-digit', 
    minute: '2-digit', 
    second: '2-digit' 
  };
  const localTime = new Date().toLocaleString('fi-FI', options);
  res.send(localTime);
});

// Login route
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    const accessToken = jwt.sign({ username: user.username, id: user.id }, process.env.SECRET_KEY);
    res.json({ accessToken });
  } else {
    res.send('Username or password incorrect');
  }
});

// Use repository routes
app.use('/repositories', repositoryRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});