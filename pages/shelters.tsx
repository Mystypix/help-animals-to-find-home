import React from 'react'
import { Container, MenuItem } from '@mui/material'
import PageTitle from '../components/page-title'
import Grid from '../components/common/Grid'
import ShelterCard from '../components/common/ShelterCard'
import { NextPage } from 'next'
import Head from 'next/head'
import SheltersMap from '../components/common/SheltersMap'
import { Content } from './shelters.styles'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { collection, getFirestore, orderBy, query, where } from 'firebase/firestore'
import Loading from '../components/common/Loading'
import Select from '../components/common/Select'

const Shelters: NextPage = () => {
  const [shelters = [], loading] = useCollectionData(
    query(
      collection(getFirestore(), 'users'),
      where('type', '==', 'shelter'),
    )
  )

  return (
    <Container>
      <Head>
        <title>Shelters</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageTitle>Shelters</PageTitle>
      <SheltersMap />
      <Content>
        {loading ? (
          <Loading />
        ) : (
          <Grid spacing={2} md={6} xs={6}>
            {shelters.map((shelter) => (
              <ShelterCard key={shelter.id} shelter={shelter} />
            ))}
          </Grid>
        )}
      </Content>
    </Container>
  )
}

export default Shelters
