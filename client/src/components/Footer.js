import React from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import './stylesheets/footer.scss'

export const Footer = () => {
  return (
    <Container fluid className='contFooter'>
        <Row>
            <Col xs={12} s={12} md={12} lg={8} className='copyright'>
            <a href="" >Copyright 2022 moubehealth | All Rigths Reserved |</a><a href=""> Política de coockies |</a><a href=''> Política de privacidad</a>
            </Col>
            <Col xs={12} s={12} md={12} lg={4} className='socialMedia'>
            <a href="" >| Facebook |</a><a href=""> Instagram |</a><a href=''> Youtube</a>
            </Col>
        </Row>
    </Container>
  )
}
