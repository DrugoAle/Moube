import React from 'react'
import{useNavigate} from 'react-router-dom'
import './stylesheets/section4.scss'
import { Button, Col, Container, Row } from 'react-bootstrap'

export const Section4 = () => {

    const navigate = useNavigate();

  return (
    <Container fluid>
    <Row className='contPart1'>
        <Col  className='backimg'></Col>
        <Col xs={12} md={12} lg={6} className='colText'>
            <Container className='contPart1Text'>
            <p>NUESTRO OBJETIVO</p>
            <h2>El bienestar de las personas.
                Por eso queremos ayudar a los pacientes a rehabilitarse y volver a tener una vida normal mediante la Telerehabilitación.
            </h2>
            </Container>
        </Col>
    </Row>
    <Row>   
        <Col className='contTrial'>
        <p>REGÍSTRATE</p>
        <h2>¿Eres fisioterapeuta? Obtén el acceso a todo el contenido de MOUBEHEALTH totalmente GRATIS durante los próximos 30 días.</h2>
        <Button>Solicitar prueba</Button>
        </Col>
    </Row>
    <Row>
        <Col className='picCont'>
        </Col>
    </Row>
    </Container>
  )
}
