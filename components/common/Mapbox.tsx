import React, { useMemo } from 'react'
import ReactMapboxGl from 'react-mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { Props as MapboxProps } from 'react-mapbox-gl/lib/map'
import { Events as MapboxEvents } from 'react-mapbox-gl/lib/map-events'

const MapboxGl = ReactMapboxGl({
  accessToken: process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN as string,
  scrollZoom: false,
})

export type Props = Partial<MapboxProps & MapboxEvents> & {
  height?: string,
}

export default function Mapbox({
  style = 'mapbox://styles/joaoahmad/cl0c5habl000714lsak2ibj5g',
  movingMethod = 'easeTo',
  height,
  ...otherProps
}: Props) {
  const containerStyle = useMemo(() => ({
    height: height || '100%',
    width: '100%',
  }), [height])
  return (
    <MapboxGl style={style} containerStyle={containerStyle} {...otherProps} />
  )
}
