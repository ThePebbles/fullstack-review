const express = require('express');
const mongoose = require('mongoose');
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
  console.log('Username from post: ', username);
  console.log('POST: This is what getReposbyUsername looks like: ', getReposByUsername);
  console.log('POST: This is what index.save looks like: ', index.save);
  getReposByUsername(username)
  .then((results) => {
    console.log('getReposByUsername results from post: ', results);
    return index.save(results);
  })
  .then((results) => {
    console.log('Save results from post: ', results);
    res.sendStatus(201).send(results);
  })
  .catch((err) => {
    console.log('Error from post: ', err);
    res.status(500).send(err);
  })
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
  console.log('GET: This is what index.Repos looks like: ', index.Repos);
  index.Repos.find().sort({'forkCount': -1}).limit(25)
  .then((results) => {
    console.log('Results from getting top 25 from Get: ', results);
    res.sendStatus(200).send(results);
  })
  .catch((err) => {
    console.log('Error from Get: ', err);
    res.sendStatus(500).send(err);
  })
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

