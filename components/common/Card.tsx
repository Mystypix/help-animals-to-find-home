import * as React from 'react'
import { Card as MUICard, CardActionArea, CardMedia } from '@mui/material'
import { useRouter } from 'next/router'
import styled from 'styled-components'

export interface ICard {
  image?: string
  alt?: string
  url?: string
  children?: React.ReactNode
}

const Card = ({ image, alt, url, children }: ICard) => {
  const router = useRouter()

  return (
    <Container onClick={() => url && router.push(url)}>
      <CardActionArea>
        {image && <CardMedia component="img" image={image} alt={alt} />}
        {children}
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
  box-shadow: 0px 4px 14px 0px #0000000f;
`
