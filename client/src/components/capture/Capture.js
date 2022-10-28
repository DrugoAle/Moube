import React from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import "./capture.scss"

export const Capture = () => {
  const navigate = useNavigate();
  return (
    <>
    <Container fluid>
    <Row>
      <Col className='captureCont'>
        <h2>Moube Pose Detection</h2>
        <iframe src='/utils/capture/holistic.html' scrolling='no'></iframe>
        <Button className='boton' onClick={()=>navigate(-1)}>Atrás</Button>
      </Col>
    </Row>

    </Container>
    </>
  )
}