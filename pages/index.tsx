import type { NextPage } from 'next'
import ShelterListSection from '../components/sections/ShelterListSection'
import FeaturedPetSection from '../components/sections/FeaturedPetSection'
import HomeIntroSection from '../components/sections/HomeIntroSection'
import React from 'react'

const Home: NextPage = () => {
  return (
    <>
      <HomeIntroSection />
      <FeaturedPetSection />
      <ShelterListSection />
    </>
  )
}

export default Home
