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
          const { id, profileImg, name, age, breed, gender } = pet
          const petCardProps = {
            name,
            image: profileImg,
            url: `/pet/detail/${id}`,
            alt: name,
            age: age ? `${age} yr` : null,
            species: breed,
            gender: gender,
          }

          return <PetCard {...petCardProps} key={id} />
        })}
      </Grid>
    </Section>
  )
}

export default NewestPetSection
