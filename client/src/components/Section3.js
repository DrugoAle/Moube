import React from 'react'
import{useNavigate} from 'react-router-dom'
import { Button, Col, Container, Row } from 'react-bootstrap'
import './stylesheets/section3.scss'

export const Section3 = () => {
    const navigate = useNavigate();
  return (
    <Container fluid>
        <Row>
            <Col className='contText'>
               <p>NUESTRA VISIÓN</p> 
               <h2>Nuestra misión es que sea universal y sencillo que las personas puedan recuperarse físicamente en casa, reduciendo el número de cirugías y de medicación para el dolor.</h2>
               <p>Todo ello gracias a un software con Inteligencia Artificial que permite a los fisioterapeutas registrar, monitorizar y controlar la recuperación de sus pacientes.</p>
            </Col>
        </Row>
        <Row>
            <Col s={12} md={12} lg={6} className='contLink' id='link1'>
                <h3>¿Eres Fisioterapeuta?</h3>
                <p>Dispón de una herramienta que te permita monitorizar los ejercicios que prescribes a tus pacientes para realizar en casa. Obtén métricas a tiepo real del nivel de dolor, esfuerzo y mejora de tus pacientes.</p>
                <Button onClick={()=>navigate('/register')}>Solicitar prueba</Button>
            </Col>
            <Col s={12} md={12} lg={6} className='contLink' id='link2'>
                <h3>¿Eres paciente?</h3>
                <p>Benefíciate de Fisioterapia Digital y reduce en un 30% el tiempo de recuperación. Te ayudamos a encontrar al fisioterapeuta ideal para ti. Empieza ya la Telerehabilitación.</p>
                <Button>Obtener más información</Button>
            </Col>
        </Row>
        <Row>
            <Col className='contText'>
               <p>¿QUÉ ES MOUBEHEALTH?</p> 
               <h2>Es una clínica digital para el tratamiento de disfunciones y alteraciones musculoesqueléticas.</h2>
               <p>Con Moubehealth tanto si eres fisioterapeuta como si eres paciente podrás llevar a cabo distintas funcionalidades con nuestro software <b>¡Descubre cuales son!</b></p>
            </Col>
        </Row>
        <Row className='contServices'>
            <Col xs={12} s={12} md={12} lg={4} className='services'>
                <img className='iconMb' src='/assets/programas.svg' />
                <h5>Elaboración de programas terapéuticos</h5>
                <p>Gracias al software con Inteligencia Artificial de MOUBE HEALTH, los fisioterapeutas podrán enviar a través de nuestra web app programas de ejercicios terapéuticos que serán monitorizados en tiempo real.</p>
            </Col>
            <Col xs={12} s={12} md={12} lg={4} className='services'>
                <img className='iconMb' src='/assets/metricas.svg' />
                <h5>Generación de métricas para conocer la evolución del paciente</h5>
                <p>Conocerás en todo momento la evolución del paciente, la sensación de dolor percibida al realizar los ejercicios y la adherencia al tratamiento.</p>
            </Col>
            <Col xs={12} s={12} md={12} lg={4} className='services'>
                <img className='iconMb' src='/assets/panel.svg' />
                <h5>Panel de control para notificaciones y alertas</h5>
                <p>A través de este panel se le informará al fisioterapeuta si el paciente empeora o no termina las terapias prescritas, garantizando así un control del proceso de fisioterapia y rehabilitación digital.</p>
            </Col>
        </Row>


    </Container>
  )
}
