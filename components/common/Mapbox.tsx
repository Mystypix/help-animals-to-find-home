import React from 'react'
import ReactMapboxGl from 'react-mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { Props } from 'react-mapbox-gl/lib/map';

const MapboxGl = ReactMapboxGl({
  accessToken: process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN as string,
})

const containerStyle = {
  height: '100%',
  width: '100%',
}

export default function Mapbox({style = 'mapbox://styles/mapbox/streets-v11', ...otherProps}: Partial<Props>) {
  return (
    <MapboxGl
      style={style}
      containerStyle={containerStyle}
      {...otherProps} 
    />
  )
}