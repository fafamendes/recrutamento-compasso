import { useState } from 'react'

import './App.css';

import Search from './componentes/search';
import Results from './componentes/results'
import { post } from 'jquery';

function redirect(url) {
  window.location.href = url;
}

function getCode() {
  let url = new URL(window.location.href);
  return url.searchParams.get('code');
}

function resetUrl() {
  window.history.pushState('', '', '/')
}

function getToken(params) {
  const { tokenUrl, code, clientId, clientSecret, setToken } = params;
  let headers = {
    'Content-Type': 'application/json'
  }
  let body = JSON.stringify({
    client_id: clientId,
    clientId_secret: clientSecret,
    code,
  });

  let fetchParams = {
    method: 'POST',
    mode: 'cors', 
    credentials: 'include',
    headers,
    body,
  }

  fetch(tokenUrl, fetchParams)
    .then(response => response.json())
    .then(myJson => { console.log(myJson) })
}

function App() {
  const clientId = 'dece2edcd9f7dca7de6a';
  const clientSecret = '95224976e8e4c991d013050790784cc4fbaefb08';

  const authUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}`,
    tokenUrl = 'https://github.com/login/oauth/access_token';


  const [user, setUser] = useState(null),
    [starred, setStarred] = useState([]),
    [repos, setRepos] = useState([]),
    [token, setToken] = useState('');

  let code = getCode();

  if (code) {
    resetUrl();
    getToken({ tokenUrl, code, clientId, clientSecret, setToken });
  }

  return (
    <div className="c-App">
      <div className="c-header" >
        <button onClick={() => redirect(authUrl)}>Logar</button>
      </div>
      <Search setUserCallback={setUser} setStarredCallback={setStarred} setReposCallback={setRepos} />
      <Results user={user} starred={starred} repos={repos} />

    </div>
  );
}


export default App;
