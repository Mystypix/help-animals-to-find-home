import React, { useState } from 'react'
import Card, { ICard } from '../common/CardImage'
import Grid from '../common/Grid'
import Section from '../common/Section'
import mockPets from '../../mocks/pets.json'

const NewestPetSection = () => {
  const [pets, setPets] = useState(mockPets) // TODO: remove mock and use setPets to get the actual data

  return (
    <Section
      title="Newest Pets Registered"
      footerLink={{ text: 'Show more...', url: '/pets?sort=newest' }}
    >
      <Grid spacing={2}>
        {pets.slice(0, 6).map((shelter) => {
          const { id, pictures, name } = shelter
          const url = `/${id}`
          const alt = name
          return <Card image={pictures[0]} url={url} alt={alt} key={id} />
        })}
      </Grid>
    </Section>
  )
}

export default NewestPetSection
