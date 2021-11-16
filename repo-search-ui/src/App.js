import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Table from 'react-bootstrap/Table'
import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form'

function App() {

  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  const [mdata, setMdata] = useState({});

  const handleClose = () => setShow(false);

  const[searchtext, setSearchtext] = useState('aaaaxxxxxxxxyyyyy');

  const[searchtextbx, setSearchtextbx] = useState('');



  const handleShow = (rwdata) => {
    setMdata(rwdata)
    setShow(true)
  };


  useEffect(() => {
    fetch('http://localhost:3001/api/repos?repoSearchText='+searchtext)
    .then(response => {
      const data = response.json()
      console.log(data)
      return data
    })
    .then(data1 => setData(data1));
  }, [searchtext])

  return (
    <div className="App">
      <header className="App-header1">
      </header>

      <Container>
            <Row>
              <Col>
                <Form.Control type="text" 
                              value={searchtextbx}
                              onChange={e=> setSearchtextbx(e.target.value)}
                              placeholder="Search Text.." />
              </Col>
              <Col>
              <Button variant="primary" onClick={() => setSearchtext(searchtextbx)}>Search</Button>{' '}

              </Col>
            </Row>
            </Container>

      <Modal show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false} >
        <Modal.Header closeButton>
          <Modal.Title>Repo Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              <Col>Full Owner Name</Col>
              <Col>
                  <a href={mdata.owner?.html_url}>{mdata.full_name}</a>
              </Col>
            </Row>
            <Row>
              <Col>Repository Name</Col>
              <Col>
                  <a href={mdata.html_url}>{mdata.name}</a>
              </Col>
            </Row>
            <Row>
              <Col>No of Open Issues</Col>
              <Col>{mdata.open_issues}</Col>
            </Row>
            <Row>
              <Col>Default Branch</Col>
              <Col>{mdata.default_branch}</Col>
            </Row>
            <Row>
              <Col>Read Me</Col>
              <Col>3 of 3</Col>
            </Row>
          </Container>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>


      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Repo Name</th>
            <th>Author</th>
            <th>Watchers</th>
            <th>Forks</th>
            <th>Description</th>
            <th>Stars</th>
          </tr>
        
        </thead>
        <tbody >
              
              {data  && data.items && data.items.map((row, i) => {
                return (
                  <tr {...row}>
                    <td onClick={() => handleShow(row)}> 
                        <a
                          style={{ cursor:"pointer" },{borderBottom: '1px solid black'}}
                          href={null} >
                          {row.name}
                      </a>
                    </td>
                    <td>{row.owner.login}</td>
                    <td>{row.watchers}</td>
                    <td>{row.forks}</td>
                    <td>{row.description}</td>
                    <td>{row.stargazers_count}</td>
                  </tr>
                );
              })}
            </tbody>
      </Table>

      
    </div>
  );
}

export default App;
