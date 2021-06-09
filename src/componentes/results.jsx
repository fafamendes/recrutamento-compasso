import { useState, setState } from 'react'

import { Container } from 'react-bootstrap'

function createElementList(data) {
  let elementList = []
  data.map((data, idx) => {
    elementList.push(<li id={idx}>
      <a href={data.html_url}>{data.name}</a>
    </li>)
  });
  return elementList;
}

function Results(props) {

  let { user, starred, repos } = props;
  let [viewdetails, setViewDetails] = useState(false);

  return (

    <div className="c-results">
      <div className="c-results__avatar">
        <img src={user && user.avatar_url} alt="Avatar" />
      </div>
      
      <div className="c-results__resume">
        <div className="c-results__resume__name">{user && user.name}</div>
        <div className="c-results__resume__starred">{`${starred.length} *`}</div>
        <div className="c-results__resume__repos">{repos.length} -</div>
      </div>
      
      <div className="c-results__starred">
      Favoritos
        <ul>
         
          {createElementList(starred)}
        </ul>
      </div>
      <div className="c-results__starred">
        Repositórios
        <ul>
          {createElementList(repos)}
        </ul>
      </div>
    </div>

  );
}


export default Results;