const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const routes = require('./routes');
const app = express();
const port = 8080;

app.use(cors({
  origin: 'http://localhost:3000',
}));

app.use(express.json());
app.use('/', routes);

const mongoUrl = process.env.MONGO_URL;

mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected successfully to MongoDB server');
});



app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});