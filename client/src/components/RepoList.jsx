import React from 'react';

const RepoList = ({ repos }) => {
  var allRepos = repos.map((repo) => {
    return (
      <li>
        <div className='RepoName'>{repo.repoName}</div>
        <div className='OwnerName'>Owner: {repo.ownerLogin}</div>
        <div className='ForkCount'> Forks: {repo.forksCount}</div>
      </li>
    )
  })
  return (
    <div>
      <h4> Top 25 Repos: </h4>
        <ol>{allRepos}</ol>
    </div>
  )
}

export default RepoList;