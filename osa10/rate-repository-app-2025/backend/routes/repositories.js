const express = require('express');
const fs = require('fs');
const authenticateJWT = require('../middleware/authenticateJWT');

const router = express.Router();
let repositories = JSON.parse(fs.readFileSync('repositories.json', 'utf8'));

// Allow unauthenticated users to view repositories
router.get('/', (req, res) => {
  res.json(repositories);
});

router.get('/:id', (req, res) => {
  const repository = repositories.find(repo => repo.id === req.params.id);
  if (repository) {
    res.json(repository);
  } else {
    res.status(404).send('Repository not found');
  }
});

// Require authentication for POST, PUT, DELETE operations
router.post('/', authenticateJWT, (req, res) => {
  const newRepository = req.body;
  repositories.push(newRepository);
  res.status(201).json(newRepository);
  res.send('Repository added' + newRepository);
});

router.put('/:id', authenticateJWT, (req, res) => {
  const index = repositories.findIndex(repo => repo.id === req.params.id);
  if (index !== -1) {
    repositories[index] = req.body;
    res.json(repositories[index]);
    res.status(200).send('Repository updated' + repositories[index]);
  } else {
    res.status(404).send('Repository not found');
  }
});

router.delete('/:id', authenticateJWT, (req, res) => {
  const index = repositories.findIndex(repo => repo.id === req.params.id);
  if (index !== -1) {
    const deletedRepository = repositories.splice(index, 1);
    res.json(deletedRepository);
    res.status(200).send('Repository deleted' + deletedRepository);
  } else {
    res.status(404).send('Repository not found');
  }
});

// User likelist feature
let userLikelists = {}; // Store user likelists in memory

router.post('/likelist/:id', authenticateJWT, (req, res) => {
  const userId = req.user.id;
  const repositoryId = req.params.id;

  if (!userLikelists[userId]) {
    userLikelists[userId] = [];
  }

  if (!userLikelists[userId].includes(repositoryId)) {
    userLikelists[userId].push(repositoryId);
  }

  res.status(200).json({ message: 'Repository added to likelist', likelist: userLikelists[userId] });
});

router.get('/likelist', authenticateJWT, (req, res) => {
  const userId = req.user.id;
  const userLikelist = userLikelists[userId] || [];
  const likedRepositories = repositories.filter(repo => userLikelist.includes(repo.id));

  res.json(likedRepositories);
});

module.exports = router;