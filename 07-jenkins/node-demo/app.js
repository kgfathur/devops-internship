const config = require('./config');

// test code smells
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  var name = "node web app"
  res.send('I am '+name+' ~');});

app.listen(config.port, () => {
console.log(`Server started on port ${config.port}`);
});
