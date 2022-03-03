import * as React from 'react'

interface IRandomImage {
  customSeed?: string
  width?: number
  height?: number
}

const RandomImage = ({
  customSeed,
  width = 900,
  height = 500,
}: IRandomImage) => {
  const randomSeed = (Math.random() * 1000).toString()
  const seed = customSeed || randomSeed
  return (
    <img
      src={`https://picsum.photos/seed/slide-${seed}/${width}/${height}`}
      alt={seed}
    />
  )
}

export default RandomImage
