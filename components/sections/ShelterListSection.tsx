import React from 'react'
import Section from '../common/Section'
import SheltersMap from '../common/SheltersMap'

const ShelterListSection = () => {
  return (
    <Section
      title="Search for a Shelter"
      backgroundColor="var(--color-primary-soft)"
      footerLink={{ text: 'List of All Shelters', url: '/shelters' }}
    >
      <SheltersMap height={400} />
    </Section>
  )
}

export default ShelterListSection
