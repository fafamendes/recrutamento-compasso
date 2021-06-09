import { useState, setState } from 'react'

import { Container } from 'react-bootstrap'

function createElementList(data, className) {
  let elementList = []
  data.map((data, idx) => {
    elementList.push(<li className={className} key={idx}>
      <a href={data.html_url}>{data.name}</a>
    </li>)
  });
  return elementList;
}

function Results(props) {

  let { user, starred, repos } = props;
  const [showStarred, setshowStarred] = useState(false),
    [showRepos, setShowRepos] = useState(false);

  return (

    <div className="c-results">
      <div className="c-results__avatar">
        <img src={user && user.avatar_url} alt="Avatar" />
      </div>

      <div className="c-results__resume">
        <div className="c-results__resume__name">{user && user.name}</div>

        <div onClick={toggleDetails} className="c-results__resume__starred">{starred.length}</div>
        <div onClick={toggleDetails} className="c-results__resume__repos">{repos.length}</div>

      </div>

      <div style={{ display: showStarred ? 'block' : 'none' }}  className="c-starred">
        <h3>Favoritos</h3>
        <ul className="c-starred__list">
          {createElementList(starred, 'c-starred__list__item')}
        </ul>
      </div>

      <div style={{ display: showRepos ? 'block' : 'none' }} className="c-repos">
        <h3>Repositórios</h3>
        <ul className="c-repos__list">
          {createElementList(repos, 'c-repos__list__item')}
        </ul>
      </div>
    </div>

  );

  function toggleDetails(ev) {
    /* Método resposável por mostrar ou esconder os detalhes do usuário (Favoritos e Repositórios) */
    let targetclassName = ev.target.className;

    if (targetclassName.indexOf('starred') > 0) {
      setshowStarred(Boolean(showStarred ^ 1));
      showRepos && setShowRepos(false);
    } else {
      setShowRepos(Boolean(showRepos ^ 1));
      showStarred && setshowStarred(false);
      console.log(showRepos)
    }
  }

}


export default Results;