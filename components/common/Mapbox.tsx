import React from 'react'
import ReactMapboxGl from 'react-mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { Props } from 'react-mapbox-gl/lib/map'

const MapboxGl = ReactMapboxGl({
  accessToken: process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN as string,
})

export default function Mapbox({
  style = 'mapbox://styles/mapbox/streets-v11',
  height,
  ...otherProps
}: Partial<Props & { height: string }>) {
  const containerStyle = {
    height: height || '100%',
    width: '100%',
  }
  return (
    <MapboxGl style={style} containerStyle={containerStyle} {...otherProps} />
  )
}
