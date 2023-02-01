const express = require('express');
const index = require('../database/index.js');
const getReposByUsername = require('../helpers/github.js');
let app = express();

// TODO - your code here!
// Set up static file service for files in the `client/dist` directory.
// Webpack is configured to generate files in that directory and
// this server must serve those files when requested.

app.post('/repos', function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  var username = req.username;
  getReposByUsername(username)
  .then((results) => {
    return index(results);
  })
  .then((results) => {
    res.sendStatus(201).send(results);
  })
  .catch((err) => {
    res.status(500).send(err);
  })
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

