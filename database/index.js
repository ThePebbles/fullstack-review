const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://sarahkwando:G%40%40dbyeHs2018@cluster0.llqdxou.mongodb.net/?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true})
.then (() => {
  console.log('dbconnected');
})
.catch((err) => {
  console.log(err);
})

let repoSchema = mongoose.Schema({
  // TODO: your schema here!
  repoId: Number,
  repoName: String,
  repoUrl: String,
  description: String,
  ownerId: Number,
  ownerLogin: String,
  forksCount: Number
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (/* TODO */) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
}

module.exports.save = save;