import * as React from 'react'
import { Card as MUICard, CardActionArea, CardMedia } from '@mui/material'
import { useRouter } from 'next/router'

const Card = ({
  image,
  alt,
  url,
}: {
  image: string
  alt: string
  url: string
}) => {
  const router = useRouter()

  return (
    <MUICard onClick={() => router.push(url)}>
      <CardActionArea>
        <CardMedia component="img" image={image} alt={alt} />
      </CardActionArea>
    </MUICard>
  )
}

export default Card
