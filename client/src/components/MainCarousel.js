import React from 'react'
import{useNavigate} from 'react-router-dom'
import { Button, Carousel, Container } from 'react-bootstrap'
import './stylesheets/mainCarousel.scss'

export const MainCarousel = () => {

  const navigate = useNavigate();
  return (
    <Carousel variant='blue'>
  <Carousel.Item className='carouselItem'>
    <img
      className="d-block w-100 h-100"
      src="/assets/background1.jpg"
      alt="First slide"
    />
    <Carousel.Caption>
      <div className='cover-text'>
      <div className='h2cont'>
      <h2>Fisioterapia Digital segura, flexible y de calidad.</h2>
      </div>
      <div className='pcont container-fluid'>
      <div className='responsiveHelper'></div>
        <p className='p1'>Monitorizar en remoto los ejercicios de un mayor número de pacientes y obtener mejores resultados clínicos en lesiones musculoesqueléticas es posible.</p>
        <p><b>¿Eres Fisioterapeuta? Prueba gratuita durante 30 días. Adelántate y haz que tus pacientes complementen sus sesiones presenciales con nuestra tecnología de Telerehabilitación.</b></p>
        <Button onClick={()=>navigate('/register')} className="m-3 btn1">Solicitar prueba</Button>
      </div>
      </div>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100 h-100"
      src="/assets/background2.jpg"
      alt="Second slide"
    />

    <Carousel.Caption>
    <div className='cover-text'>
      <div className='h2cont'>
      <h2>Fisioterapia Digital segura, flexible y de calidad.</h2>
      </div>
      <div className='pcont'>
        <div className='responsiveHelper'></div>
        <p className='p1'>Monitorizar en remoto los ejercicios de un mayor número de pacientes y obtener mejores resultados clínicos en lesiones musculoesqueléticas es posible.</p>
        <p><b>¿Eres Fisioterapeuta? Prueba gratuita durante 30 días. Adelántate y haz que tus pacientes complementen sus sesiones presenciales con nuestra tecnología de Telerehabilitación.</b></p>
        <Button onClick={()=>navigate('/register')} className="m-3 btn1">Solicitar prueba</Button>
      </div>
      </div>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100 h-100"
      src="/assets/background5.jpg"
      alt="Third slide"
    />

    <Carousel.Caption>
    <div className='cover-text'>
      <div className='h2cont'>
      <h2>Fisioterapia Digital segura, flexible y de calidad.</h2>
      </div>
      <div className='pcont'>
      <div className='responsiveHelper'></div>
        <p className='p1'>Monitorizar en remoto los ejercicios de un mayor número de pacientes y obtener mejores resultados clínicos en lesiones musculoesqueléticas es posible.</p>
        <p><b>¿Eres Fisioterapeuta? Prueba gratuita durante 30 días. Adelántate y haz que tus pacientes complementen sus sesiones presenciales con nuestra tecnología de Telerehabilitación.</b></p>
        <Button onClick={()=>navigate('/register')} className="m-3 btn1">Solicitar prueba</Button>
      </div>

      </div>
    </Carousel.Caption>
  </Carousel.Item>
</Carousel>
  )
}
