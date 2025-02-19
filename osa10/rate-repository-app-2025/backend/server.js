const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const authenticateJWT = require('./middleware/authenticateJWT');
const repositoryRoutes = require('./routes/repositories');

dotenv.config();

const app = express();
const PORT = process.env.PORT;

// In-memory user data
const users = [
  {
    id: '1',
    username: 'user1',
    password: 'password' // plain text for simplicity
  }
];

app.use(bodyParser.json());

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