import React, { useCallback, useState } from 'react'
import {
  Marker,
  Popup,
  RotationControl,
  ScaleControl,
  ZoomControl,
} from 'react-mapbox-gl'
import shelters from '../../mocks/shelters.json'
import Image from './Image'
import Mapbox from './Mapbox'
import { MapContainer, MarkerWrap, PopupBox } from './SheltersMap.styles'

const PRAGUE_COORDS: [number, number] = [14.42139, 50.08861]
const DEFAULT_ZOOM: [number] = [12]

export type Props = {
  height?: number | string,
}

export default function SheltersMap({height}: Props) {
  const [selectedShelter, setSelectedShelter] = useState<any>()
  const [center, setCenter] = useState(PRAGUE_COORDS)
  const [zoom, setZoom] = useState(DEFAULT_ZOOM)

  const handleClick = useCallback((shelter) => {
    setSelectedShelter(shelter)
    setCenter(shelter.coordinates)
    setZoom([14])
  }, [])

	return (
		<MapContainer style={{height}}>
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
	)
}
