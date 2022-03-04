import React from 'react'
import Section from '../common/Section'
import { getFirestore, collection } from 'firebase/firestore'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import Map from '../../pages/map'

const ShelterListSection = () => {
  const [shelters, loading, error] = useCollectionData(
    collection(getFirestore(), 'users')
  )

  return (
    <Section
      title="Search for a Shelter"
      backgroundColor="var(--color-primary-soft)"
      footerLink={{ text: 'List of All Shelters', url: '/shelters' }}
    >
      <Map height="400px" />
    </Section>
  )
}

export default ShelterListSection
