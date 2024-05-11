const express = require('express');
const router = express.Router();
const Record = require('./models/record');

router.get('/', (req, res) => {
  res.send('Hello World!');
});

router.post('/records', async (req, res) => {
  try {
    const record = new Record(req.body);
    await record.save();
    res.status(201).send(record);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get('/records', async (req, res) => {
  const records = await Record.find({});
  res.send(records);
});

module.exports = router;