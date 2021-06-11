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
    client_secret: clientSecret,
    code,
    state: String(parseInt(Math.random()*1000000000000)),
    redirect_uri: 'http://recrutamento.uol:3000/'
  });

  let fetchParams = {
    method: 'POST',
    mode: 'no-cors',
    referrerPolicy: 'origin',
    headers,
    body,
  };
  console.log(body)
  fetch(tokenUrl, fetchParams)
    .then(function (response) {
      console.log(response)
      if (response.ok) {
        
        response.json()
          .then(function (myJson) {
            console.log(myJson)
          })
      }
    })
}

function App() {
  const clientId = 'dece2edcd9f7dca7de6a';
  const clientSecret = 'a715b14a4a31f6b7b4ede4827b4108534521eb74';

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
