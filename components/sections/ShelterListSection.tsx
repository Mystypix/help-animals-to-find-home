import React, { useState } from 'react'
import Card, { ICard } from '../common/CardImage'
import Grid from '../common/Grid'
import Section from '../common/Section'
import { getFirestore, collection } from 'firebase/firestore'
import { useCollectionData } from 'react-firebase-hooks/firestore'

const ShelterListSection = () => {
  const [shelters, loading, error] = useCollectionData(collection(
    getFirestore(), 'users'),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  )

  return (
    <Section
      title="Featured Shelters"
      backgroundColor="#eee"
      footerLink={{ text: 'Show more...', url: '/shelters' }}
    >
      <Grid spacing={2}>
        {loading && <div>loading...</div>}
        {error && <div>shit</div>}
        {shelters && (
          <div>
            {shelters.slice(0, 6).map((shelter) => {
              const { name, id } = shelter
              return <Card key={id} name={name} />
            })}
          </div>
        )}
      </Grid>
    </Section>
  )
}

export default ShelterListSection
