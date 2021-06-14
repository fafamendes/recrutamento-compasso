import { findByPlaceholderText } from '@testing-library/react';
import { useState } from 'react'

import Button from './button';

//daasd

function createElementList(data, className) {
  let elementList = []
  console.log(data)
  if (data && data.length > 0) {
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

function formatText(value, text) {
  return `${(value && value.length) || 0}  ${text}`;
}

function Results(props) {

  let { user, starred, repos } = props;
  const [showStarred, setshowStarred] = useState(false),
    [showRepos, setShowRepos] = useState(false);

  if (user && !user.err) {
    console.log(starred)
    return (
      <div className="c-results">
        <div>
          <img className="c-results__avatar" src={user && user.avatar_url} alt="Avatar" />
          <div className="c-results__resume">
            <h1 className="c-results__resume__name">{user && user.name}</h1>
            <Button
              callback={toggleDetails}
              className="c-results__resume__starred bi bi-star"
              text={formatText(starred, 'Favoritos')}
            />
            <Button
              callback={toggleDetails}
              className="c-results__resume__repos bi bi-list"
              text={formatText(repos, 'Repositórios')}
            />

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
  } else if (user && user.err) {
    return (
      <div className="c-results-error">
        {user.err}
      </div>);

  } else {
    return (
      <div>

      </div>)
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
    }
  }

}


export default Results;