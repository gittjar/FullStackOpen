const express = require('express');
const router = express.Router();
const Record = require('./models/record');

router.get('/', (req, res) => {
  res.send('This is recordbase backend!');
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

router.delete('/records/:id', async (req, res) => {
  try {
    const record = await Record.findByIdAndDelete(req.params.id);

    if (!record) {
      return res.status(404).send();
    }

    res.send(record);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;