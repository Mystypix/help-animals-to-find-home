import React, { useState } from 'react'
import styled from 'styled-components'
import Card from '../common/CardImage'
import Grid from '../common/Grid'
import Link from '../common/Link'
import Text from '../common/Text'
import { Container as MUIContainer, Box as MUIBox } from '@mui/material'
import mockShelters from '../../mocks/shelters.json'

const ShelterListSection = () => {
  const [shelters, setShelters] = useState(mockShelters) // TODO: remove mock and use setShelters to get the actual data

  return (
    <Container style={{ backgroundColor: '#eee', width: '100vw' }}>
      {/* TODO: soon to be split into a common component called */}
      <MUIContainer sx={{ mh: 2 }}>
        <Text variant="h4" component="h2">
          Featured Shelters
        </Text>
        <Grid spacing={2}>
          {shelters
            .slice(0, 6)
            .map(
              (
                { image, userName },
                index
              ): { image: string; url: string; index: number } => (
                <Card
                  image={image}
                  url={`/${userName}`}
                  alt="Lorem ipsum image"
                  key={index}
                />
              )
            )}
        </Grid>
        <MUIBox
          sx={{
            mv: 1,
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
          }}
        >
          <Link url="/">See more...</Link>
        </MUIBox>
      </MUIContainer>
    </Container>
  )
}

export default ShelterListSection

const Container = styled.section`
  display: flex;
  justify-content: center;
  flex-direction: center;
`
