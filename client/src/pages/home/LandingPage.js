import React from 'react'
import { NavBarApp } from '../../components/NavBarApp'
import { MainCarousel } from '../../components/MainCarousel'
import { Section3 } from '../../components/Section3'
import { Section4 } from '../../components/Section4'
import { Footer } from '../../components/Footer'

export const LandingPage = () => {
  return (
    <div>

      <NavBarApp/>
      <MainCarousel/>
      <Section3/>
      <Section4/>
      <Footer/>

    </div>
  )
}
