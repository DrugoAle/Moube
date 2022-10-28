import React from 'react'
import{Link, useNavigate, useParams} from 'react-router-dom'
import {Navbar, Container, Nav, Button, Form, Row, Col} from 'react-bootstrap'
import './stylesheets/navbar.scss'

export const NavBarApp = () => {

    const navigate = useNavigate();


  return (
<Navbar className='color-nav' expand="lg">
  <Container fluid className='navCont'>
  <Navbar.Brand className='navbar-brand' as={Link} to='/'>
      <img className='logo1' src='/assets/logo1.png' />
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="me-auto my-2 my-lg-0">

      </Nav>
      <Nav className="d-flex justify-content-end contButtons">
      <Button onClick={()=>navigate('/register')} className="m-3 btn1">Obtener más información</Button>
      <Button onClick={()=>navigate('/login')} className="m-3 btn2">Iniciar sesión</Button>
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>

  )
}
