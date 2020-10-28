require('dotenv').config();

const fs = require('fs');

const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const app = express();


const todoRoutes = require('./routes/todoRouter');


app.set('view engine', 'pug');
app.set('views', 'views')

app.use(bodyParser.urlencoded({ extended : true }));
app.use(bodyParser.json());

app.use('/todos', todoRoutes);

app.use('/', (req, res, next) => {
  res.send('<h1>Page introuvable</h1>');
})

const PORT = process.env.port | 8000;

const server = app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
