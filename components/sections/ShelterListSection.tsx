import React, { useState } from 'react'
import Card, { ICard } from '../common/CardImage'
import Grid from '../common/Grid'
import Section from '../common/Section'
import mockShelters from '../../mocks/shelters.json'

const ShelterListSection = () => {
  const [shelters, setShelters] = useState(mockShelters) // TODO: remove mock and use setShelters to get the actual data

  return (
    <Section
      title="Featured Shelters"
      backgroundColor="#eee"
      footerLink={{ text: 'Show more...', url: '/shelters' }}
    >
      <Grid spacing={2}>
        {shelters.slice(0, 6).map((shelter) => {
          const { userName, image } = shelter
          const url = `/${userName}`
          const alt = userName
          return <Card image={image} url={url} alt={alt} key={userName} />
        })}
      </Grid>
    </Section>
  )
}

export default ShelterListSection
