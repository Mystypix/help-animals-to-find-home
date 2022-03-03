import React from 'react'
import styled from 'styled-components'
import Card from '../common/Card'
import Text from '../common/Text'

interface IPetCard {
  image: string
  name: string
  age: string
  species: string
  url: string
  alt: string
}

const PetCard = ({ image, name, age, species, url, alt }: IPetCard) => {
  const PetDetails = () => {
    return (
      <Container>
        <div>
          <Text variant="h6" component="span">
            {name}
          </Text>
          {age && (
            <Text
              variant="body1"
              component="span"
              style={{ paddingLeft: 18, color: 'var(--color-secondary)' }}
            >
              {age}
            </Text>
          )}
        </div>
        <Text variant="body1" component="p">
          {species}
        </Text>
      </Container>
    )
  }
  return (
    <Card image={image} url={url} alt={alt}>
      <PetDetails />
    </Card>
  )
}

export default PetCard

const Container = styled.div`
  padding: 24px 32px;
`
