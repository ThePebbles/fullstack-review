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

let save = (...repos) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
  return repos.forEach((repo) => {
    Repo.findOne({'repoId': repo.id})
    .then((results) => {
      if (!results) {
        return Repo.create({
          'repoId': repo.id,
          'repoName': repo.name,
          'repoUrl': repo.url,
          'description': repo.description,
          'ownerId': repo.owner.id,
          'ownerLogin': repo.owner.login,
          'forksCount': repo.fork_count
        })
        .then((repoEntry) => {
          return repoEntry.save()
        })
        .catch((err) => {
          console.log('Error in save: ', err);
        })
      } else {
        return Repo.update({
          'repoId': repo.id,
          'repoName': repo.name,
          'repoUrl': repo.url,
          'description': repo.description,
          'ownerId': repo.owner.id,
          'ownerLogin': repo.owner.login,
          'forksCount': repo.fork_count
        })
        .then((repoEntry) => {
          return repoEntry.save()
        })
        .catch((err) => {
          console.log('Error in save: ', err);
        })
      }
    });
  });
  // basic logic
  //   var repoEntry = Repo.create({   or Repo.update
  //     'repoId': repo.id,
  //     'repoName': repo.name,
  //     'repoUrl': repo.url,
  //     'description': repo.description,
  //     'ownerId': repo.owner.id,
  //     'ownerLogin': repo.owner.login,
  //     'forksCount': repo.fork_count
  //   });
  //   repoEntry.save()
  //   .then(() => {
  //     console.log('Repo entry saved!')
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
  // });
  // Another option for iterating over all repos
  // for (var i = 0; i < repos.length; i++) {
  //   var repoEntry = new Repo({
  //     'repoId': repos[i].id,
  //     'repoName': repos[i].name,
  //     'repoUrl': repos[i].url,
  //     'description': repos[i].description,
  //     'ownerId': repos[i].owner.id,
  //     'ownerLogin': repos[i].owner.login,
  //     'forksCount': repos[i].fork_count
  //   });
  //   repoEntry.save()
  //   .then(() => {
  //     console.log('Repo entry saved!')
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
  // }
}

module.exports.save = save;