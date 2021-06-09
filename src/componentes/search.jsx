import { Form, FormGroup, FormControl } from 'react-bootstrap';
import { Container, Col, Row } from 'react-bootstrap'
import { Button } from 'react-bootstrap'

function getUserInfo(props) {
  let { setUserCallback, setStarredCallback, setReposCallback } = props;
  console.log(props)
  let username = document.getElementById('username').value;
  let params = { method: 'GET' };

  doFetch(`https://api.github.com/users/${username}`, params, setUserCallback);
  doFetch(`https://api.github.com/users/${username}/repos`, params, setReposCallback);
  doFetch(`https://api.github.com/users/${username}/starred`, params, setStarredCallback);
}

function doFetch(url, params, callback) {
  let responseJson;

  fetch(url, params)
    .then(function (response) {
      if (response.ok) {
        response.json()
          .then(function (myJson) {
            callback(myJson)

          });
      } else {
        console.log('Falha de internet');
      }
    })
    .catch(function (error) {
      console.log('Erro de operação: ' + error.message);
    });
}


function Search(props) {

  return (
    <Container fluid>
      <h1>Recrutamento Compasso</h1>
      <Form >
        <Row>
          <Col>
            <FormGroup controlId="username">
              <FormControl type="text" placeholder="Nome de usuário" />
            </FormGroup>
          </Col>
          <Col >
            <Button onClick={() => { getUserInfo(props) }}>Buscar</Button>
          </Col>
        </Row>
      </Form>

    </Container>
  );
}

export default Search;