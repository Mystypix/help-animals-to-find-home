import React, { useState } from 'react'
import Card, { ICard } from '../common/Card'
import Grid from '../common/Grid'
import Section from '../common/Section'
import mockPets from '../../mocks/pets.json'
import PetCard from '../cards/PetCard'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { getFirestore, collection } from 'firebase/firestore'


const NewestPetSection = () => {
  const [users, loading, error] = useCollectionData(
    collection(getFirestore(), 'users')
  )

  const pets = users ? users.reduce((acc, user): any => {
    if (user.pets) {
      acc.push(...user.pets)
    }
    return acc
  }, []) : []

  return (
    <Section
      title="Pets to Adopt"
      footerLink={{ text: 'View All Pets', url: '/pets?sort=newest' }}
      backgroundColor='var(--color-secondary-soft)'
    >
      <Grid spacing={2}>
        {pets.slice(0, 4).map((pet: any) => {
          const { id, pictures, name, birthday, species } = pet
          const petCardProps = {
            name,
            image: pictures && pictures[0],
            url: `/${id}`,
            alt: name,
            age: birthday ? `${
              new Date().getFullYear() - new Date(birthday).getFullYear()
            } yr` : null,
            species,
          }

          return <PetCard {...petCardProps} key={id} />
        })}
      </Grid>
    </Section>
  )
}

export default NewestPetSection
