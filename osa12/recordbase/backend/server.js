const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 8080;

const mongoUrl = process.env.MONGO_URL;

mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected successfully to MongoDB server');
});

const recordSchema = new mongoose.Schema({
  recordname: String,
  artist: String,
  year: Number
});

const Record = mongoose.model('Record', recordSchema);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});