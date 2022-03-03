import Image from '../components/image'
import React from 'react'
import type { NextPage } from 'next'
import {StyledIntroWraper} from './index.styles'
import ShelterListSection from '../components/sections/ShelterListSection'
import NewestPetSection from '../components/sections/NewestPetSection'

const Home: NextPage = () => {
  return (
    <>
      <StyledIntroWraper>
        <div>
          <h1>Dream about best friend?</h1>
          <p>Our best beauties waiting for a home</p>
        </div>
        <Image src='/images/intro.png' width='572' height='560' alt='Into image - dog' />
      </StyledIntroWraper>
      <NewestPetSection />
      <ShelterListSection />
    </>
  )
}

export default Home
