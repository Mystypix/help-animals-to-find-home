import type { NextPage } from 'next'
import React from 'react'
import Head from 'next/head'
import Mapbox from '../components/common/Mapbox'
import {
  Marker,
  Popup,
  RotationControl,
  ScaleControl,
  ZoomControl,
} from 'react-mapbox-gl'
import { MapContainer, MarkerWrap, PopupBox } from './map.styles'
import Image from '../components/common/Image'
import shelters from '../mocks/shelters.json'
import { useCallback, useState } from 'react'

const PRAGUE_COORDS: [number, number] = [14.42139, 50.08861]
const DEFAULT_ZOOM: [number] = [12]

const Map: NextPage = () => {
  const [selectedShelter, setSelectedShelter] = useState<any>()
  const [center, setCenter] = useState(PRAGUE_COORDS)
  const [zoom, setZoom] = useState(DEFAULT_ZOOM)

  const handleClick = useCallback((shelter) => {
    setSelectedShelter(shelter)
    setCenter(shelter.coordinates)
    setZoom([14])
  }, [])

  return (
    <>
      <MapContainer>
        <Mapbox center={center} zoom={zoom}>
          <>
            <ZoomControl />
            <ScaleControl />
            <RotationControl />
            {shelters.map((shelter) => (
              <Marker
                key={shelter.id}
                coordinates={shelter.coordinates}
                onClick={() => handleClick(shelter)}
                anchor="center"
              >
                <MarkerWrap>
                  <Image
                    src="/map-marker.png"
                    width={40}
                    height={40}
                    alt={shelter.name}
                  />
                </MarkerWrap>
              </Marker>
            ))}
            {selectedShelter && (
              <Popup coordinates={selectedShelter.coordinates}>
                <PopupBox>
                  <div>{selectedShelter.name}</div>
                </PopupBox>
              </Popup>
            )}
          </>
        </Mapbox>
      </MapContainer>
    </>
  )
}

export default Map
