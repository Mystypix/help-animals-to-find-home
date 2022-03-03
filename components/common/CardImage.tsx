import * as React from 'react'
import { Card as MUICard, CardActionArea, CardMedia } from '@mui/material'
import { useRouter } from 'next/router'
import styled from 'styled-components'

export interface ICard {
  image: string
  alt: string
  url?: string
}

const Card = ({ image, alt, url }: ICard) => {
  const router = useRouter()

  return (
    <Container onClick={() => url && router.push(url)}>
      <CardActionArea>
        <CardMedia component="img" image={image} alt={alt} />
      </CardActionArea>
    </Container>
  )
}

export default Card

const Container = styled(MUICard)`
  transition: all 0.2s ease;
  :hover {
    filter: brightness(1.1);
    transform: scale(0.95);
  }
`
