import React from 'react'
import styled from 'styled-components'
import Card from '../common/Card'
import Text from '../common/Text'
import Image from '../common/Image'

interface IPetCard {
  image: string
  name: string
  age?: string | null
  species: string
  url: string
  alt: string
  gender?: string
  address?: string
}

const PetCard = ({ image, name, age, species, url, alt, gender, address }: IPetCard) => {
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
              style={{ fontSize: '14px', position: 'absolute', top: '186px', right: '46px', padding: '0 10px', color: 'white', background: '#FFC285', textAlign: 'center', borderRadius: '20px', lineHeight: '24px' }}
            >
              {age}
            </Text>
          )}
          {gender && (
            <div style={{position: 'absolute', top: '186px', right: '12px'}} >{gender === 'male' ? <Image src='/images/male.svg' width='24' height='24' /> : <Image src='/images/female.svg' width='24' height='24' />}</div>
          )}
        </div>
        <Text variant="body1" component="p">
          {species}
        </Text>
        {address && (
          <div style={{display: 'flex', alignItems: 'flex-start', marginTop: '6px'}}><div style={{flex: '0 0 18px', marginRight: '6px'}}><Image src='/images/map.svg' width='18' height='18' /></div><div style={{opacity: '.6'}}>{address}</div></div>
        )}
      </Container>
    )
  }
  return (
    <Card image={image} url={url} alt={alt} >
      <PetDetails />
    </Card>
  )
}

export default PetCard

const Container = styled.div`
  padding: 24px 32px;
`
