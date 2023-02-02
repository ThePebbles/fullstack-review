const express = require('express');
const mongoose = require('mongoose');
const index = require('../database/index.js');
const github = require('../helpers/github.js');
let app = express();
app.use(express.static(__dirname + 'public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});
// TODO - your code here!
// Set up static file service for files in the `client/dist` directory.
// Webpack is configured to generate files in that directory and
// this server must serve those files when requested.

app.post('/repos', function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  //console.log('THIS IS REQ: ', req.body);
  var username = req.body.username;

  github.getReposByUsername(username)
    .then((results) => {
      //console.log('getReposByUsername results from post: ', results.data);
      return index.save(results.data);
    })
    .then((results) => {
      //console.log('Save results from post: ', results);
      res.send(results);
    })
    .catch((err) => {
      console.log('Error from post: ', err);
      res.status(500).send(err);
    })
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
  index.Repo.find().sort({'forkCount': 1}).limit(25)
  .then((results) => {
    //console.log('Results from getting top 25 from Get: ', results);
    res.status(200).send(results);
  })
  .catch((err) => {
    console.log('Error from Get: ', err);
    res.sendStatus(500).send(err);
  })
});

app.get('/', function(req, res){
  res.redirect('/repos');
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

