'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const client = require('./client');
const keys = require('./keys');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get('/:address', async (req, res) => {
  try {
    const address = req.query.address;
    const location = await client.getLocation(address);
    res.send({ location });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

app.listen(keys.port, () => console.log('API running on port', keys.port));