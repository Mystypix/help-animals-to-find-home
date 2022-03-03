import NextImage from "next/image"
import React from 'react'

const customLoader = ({ src }: any) => {
  return src
}

export default function Image(props: any) {
  return (
    <NextImage
      {...props}
      loader={customLoader}
      unoptimized={true}
    />
  )
}