const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const db = require('../database');
const models = require ('./models')
const routes = require('./routes');


const app = express();
const PORT = 3001;

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use('/api/qa', routes);

app.listen(PORT, () => {
  console.log(`Listening to port: ${PORT}`);
});




