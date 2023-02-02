import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

const { useEffect } = React;

const App = () => {

  const [repos, setRepos] = useState([]);

  useEffect(() => {
    repoView();
  }, []);

  const repoView = () => {
    $.ajax({
      method: 'GET',
      url: 'http://localhost:1128/repos',
      success: (data) => {
        console.log('DATA from GET Client: ', data);
        setRepos(data);
      },
      error: (jqxhr, status, err) => {
        console.log('This is client error: ', err);
      }
    })
  }

  const search = (term) => {
    console.log(`${term} was searched`);
    $.ajax({
      method: 'POST',
      url: 'http://localhost:1128/repos',
      data: { username: term },
      success: (data) => {
        setRepos(data);
        repoView();
      },
      error: (jqxhr, status, err) => {
        console.log('This is client error: ', err);
      }
    })
  }

  return (
    <div>
      <h1>Github Fetcher</h1>
      <Search onSearch={search}/>
      <RepoList repos={repos}/>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('app'));