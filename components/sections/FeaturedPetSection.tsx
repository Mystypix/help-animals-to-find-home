import React, { useState } from 'react'
import Card, { ICard } from '../common/Card'
import Grid from '../common/Grid'
import Section from '../common/Section'
import mockPets from '../../mocks/pets.json'
import PetCard from '../cards/PetCard'

const NewestPetSection = () => {
  const [pets, setPets] = useState(mockPets) // TODO: remove mock and use setPets to get the actual data

  return (
    <Section
      title="Pets to Adopt"
      footerLink={{ text: 'View All Pets', url: '/pets?sort=newest' }}
    >
      <Grid spacing={2}>
        {pets.slice(0, 4).map((pet) => {
          const { id, pictures, name, birthday, species } = pet
          const petCardProps = {
            name,
            image: pictures[0],
            url: `/${id}`,
            alt: name,
            age: `${
              new Date().getFullYear() - new Date(birthday).getFullYear()
            } yr`,
            species,
          }

          return <PetCard {...petCardProps} key={id} />
        })}
      </Grid>
    </Section>
  )
}

export default NewestPetSection
