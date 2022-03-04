import React from 'react'
import { Container } from '@mui/material'
import PageTitle from '../components/page-title'
import Grid from '../components/common/Grid'
import ShelterCard from '../components/common/ShelterCard'
import { NextPage } from 'next'
import Head from 'next/head'
import SheltersMap from '../components/common/SheltersMap'
import { List } from './shelters.styles'

const shelter = {
  id: '1', 
  profileImg: '/images/placeholder.svg',
  name: 'Animal Shelter Name', 
  description: 'The Alberta SPCA operates independently of all other animal welfare organizations. The links on this page are provided as a service to the pu...',
  address: 'Ukrajinská 334/21 , Prague 4'
}

const Shelters: NextPage = () => {
  return (
    <Container>
      <Head>
        <title>Shelters</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageTitle>Shelters</PageTitle>
      <SheltersMap />
      <List>
        <Grid spacing={2} md={6} xs={6}>
          <ShelterCard shelter={shelter} />
          <ShelterCard shelter={shelter} />
          <ShelterCard shelter={shelter} />
        </Grid>
      </List>
    </Container>
  )
}

export default Shelters
