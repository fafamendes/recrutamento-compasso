import { useState, setState } from 'react'

import './App.css';

import Search from './componentes/search';
import Results from './componentes/results'

function App() {

  const [user, setUser] = useState(null)
  const [starred, setStarred] = useState([]);
  const [repos, setRepos] = useState([]);

  return (
    <div className="App">

      <Search setUserCallback={setUser} setStarredCallback={setStarred} setReposCallback={setRepos} />

      <Results user={user} starred={starred} repos={repos} />

    </div>
  );
}

export default App;
