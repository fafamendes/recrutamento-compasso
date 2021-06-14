import { useState } from 'react'

import './App.css';

import Search from './componentes/search';
import Results from './componentes/results'

function App() {
  const [user, setUser] = useState(),
    [starred, setStarred] = useState([]),
    [repos, setRepos] = useState([]);

  return (
    <div className="c-App">
      <Search setUserCallback={setUser} setStarredCallback={setStarred} setReposCallback={setRepos} />
      <Results user={user} starred={starred} repos={repos} />
    </div>
  );
}


export default App;
