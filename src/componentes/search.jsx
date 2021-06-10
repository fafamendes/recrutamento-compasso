import { Form, FormGroup, FormControl } from 'react-bootstrap';
import { Container, Col, Row } from 'react-bootstrap'
import { Button } from 'react-bootstrap'

function getUserInfo(props) {
  /* Método resposável por receber os resultados da requisição e passando as funções de callback do componente pai*/
  let { setUserCallback, setStarredCallback, setReposCallback } = props;
  let username = document.getElementById('username').value;
  let params = { method: 'GET' };

  doFetch(`https://api.github.com/users/${username}`, params, setUserCallback);
  doFetch(`https://api.github.com/users/${username}/repos`, params, setReposCallback);
  doFetch(`https://api.github.com/users/${username}/starred`, params, setStarredCallback);
}

function doFetch(url, params, callback) {
  /* Método responsável por realizar requisições e definir o estado do componente pai */
  fetch(url, params)
    .then(function (response) {
      if (response.ok) {
        response.json()
          .then(function (myJson) {
            callback(myJson);
          });
      } else {
        callback(null);
      }
    })
    .catch(function (error) {
      console.log('Erro de operação: ' + error.message);
    });
}

function Search(props) {

  return (
    <Container className="c-search" fluid>
      <Form >
        <Row>
          <Col lg="10">
            <FormGroup controlId="username">
              <FormControl type="text" placeholder="Nome de usuário" />
            </FormGroup>
          </Col>
          <Col lg="2">
            <Button onClick={() => { getUserInfo(props) }}>Buscar</Button>
          </Col>
        </Row>
      </Form>

    </Container>
  );
}

export default Search;