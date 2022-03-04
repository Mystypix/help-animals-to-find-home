import React, { useCallback, useRef, useState } from 'react'
import {Marker, Popup, ZoomControl} from 'react-mapbox-gl'
import Image from './Image'
import Mapbox from './Mapbox'
import { MapContainer, MapIcon, MarkerWrap, PopupAddress, PopupTitle, PopupButtonContainer } from './SheltersMap.styles'
import Button from '../common/Button'
import { useRouter } from 'next/router'
import { query, collection, getFirestore, orderBy, where } from 'firebase/firestore'
import { useCollectionData } from 'react-firebase-hooks/firestore'

const DEFAULT_CENTER_COORDS: [number, number] = [9.984608524964438, 51.31476531127625]
const DEFAULT_ZOOM: [number] = [4]
const STUPID_CENTER_OFFSET_ADJUST = .0025

export type Props = {
  height?: number | string,
}

export default function SheltersMap({height}: Props) {
  const router = useRouter()
  const [selected, setSelected] = useState<any>()
  const [center, setCenter] = useState(DEFAULT_CENTER_COORDS)
  const [zoom, setZoom] = useState(DEFAULT_ZOOM)
  const [shelters = []] = useCollectionData(
    query(
      collection(getFirestore(), 'users'),
      where('type', '==', 'shelter'),
    )
  )

  const handleClick = useCallback((shelter) => {
    setSelected(shelter)
    setCenter([shelter.coordinates[0], shelter.coordinates[1] + STUPID_CENTER_OFFSET_ADJUST])
    setZoom([14])
  }, [])

	return (
		<MapContainer style={{height}}>
        <Mapbox center={center} zoom={zoom}>
          <>
            <ZoomControl />
            {shelters.filter(shelter => shelter.coordinates).map((shelter) => (
              <Marker
                key={shelter.id}
                coordinates={shelter.coordinates}
                onClick={() => handleClick(shelter)}
                anchor="bottom"
              >
                <MarkerWrap>
                  <Image
                    src={shelter.id === selected?.id ? '/images/map-marker-dark.svg' : '/images/map-marker-pink.svg'}
                    width={40}
                    height={50}
                    alt={shelter.name}
                    objectFit='cover'
                  />
                </MarkerWrap>
              </Marker>
            ))}
            {selected && (
              <Popup coordinates={selected.coordinates} offset={60} anchor='bottom'>
                <PopupTitle>{selected.name}</PopupTitle>
                <PopupAddress><MapIcon /> {selected.address}</PopupAddress>
                <PopupButtonContainer>
                  <Button onClick={() => router.push(`/shelter/${selected.id}`)}>View Shelter</Button>
                </PopupButtonContainer>
              </Popup>
            )}
          </>
        </Mapbox>
      </MapContainer>
	)
}
