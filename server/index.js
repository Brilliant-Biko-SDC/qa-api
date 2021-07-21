const express = require('express');
const db = require('../database');
const models = require ('./models')
const routes = require('./routes');

const app = express();
const PORT = 3001;
// app.use(morgan('tiny')) stream

app.use(express.json());
app.use('/api/qa', routes);

app.listen(PORT, () => {
  console.log(`Listening to port: ${PORT}`);
});




