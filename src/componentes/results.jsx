import { useState } from 'react'

function createElementList(data, className) {
  let elementList = []
  if (data.length > 0) {
    data.map((data, idx) => {
      return elementList.push(<li className={className} key={idx}>
        <a target="blank" href={data.html_url}>{data.name}</a>
      </li>)
    });
    return elementList;
  } else {
    return (<div>Nenhum item encontrado</div>)
  }
}

function Results(props) {

  let { user, starred, repos } = props;
  const [showStarred, setshowStarred] = useState(false),
    [showRepos, setShowRepos] = useState(false);

  if (user) {
    return (

      <div className="c-results">
        <div>
          <img className="c-results__avatar" src={user && user.avatar_url} alt="Avatar" />
          <div className="c-results__resume">
            <h1 className="c-results__resume__name">{user && user.name}</h1>
            <div onClick={toggleDetails} className="c-results__resume__starred bi bi-star"> {starred && starred.length} Favoritos</div>
            <div onClick={toggleDetails} className="c-results__resume__repos bi bi-list"> {repos && repos.length} Repositórios</div>

          </div>
        </div>

        <div>
          <div style={{ display: showStarred ? 'block' : 'none' }} className="c-starred">
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
      </div>
    );
  } else {
    return (
      <div>

      </div>);
  }


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