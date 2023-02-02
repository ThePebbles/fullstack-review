import React from 'react';

const RepoList = ({ repos }) => {
  var allRepos = repos.map((repo) => {
    return (
      <li>
        <div>
          <a className='RepoName' href={repo.repoUrl} target='_blank'>
            {repo.repoName}
          </a>
        </div>
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