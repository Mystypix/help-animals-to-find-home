import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import Image from './Image'
import MapOutlinedIcon from '@mui/icons-material/MapOutlined'
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage'

const PLACEHOLDER_IMAGE = '/images/placeholder.svg'

export type Props = any

const ShelterCard = ({ shelter }: Props) => {
  const [shelterImg, setShelterImg] = useState('')
  useEffect(() => {
    const getShelterImg = async () => {
      const storage = getStorage()
      const imgRef = ref(storage, `${shelter.id}-shelter`)
      try {
        const imgUrl = await getDownloadURL(imgRef)
        setShelterImg(imgUrl)
      } catch (err: any) {
        if (err.code === 'storage/object-not-found') {
          setShelterImg(await getDownloadURL(ref(storage, `default-shelter`)))
        }
        console.log(err)
      }
    }
    getShelterImg()
  }, [])
  console.log({shelter, shelterImg})
  return (
    <Link href={`/shelter-detail/${shelter.id}`} passHref>
			<Card>
        <CardImage src={shelterImg || PLACEHOLDER_IMAGE} width={100} height={75} alt={shelter.name} />
        <Content>
          <Title>{shelter.name}</Title>
          <Description>{shelter.description}</Description>
          <Address><MapIcon /> {shelter.address}</Address>
        </Content>
      </Card>
    </Link>
  )
}

export default ShelterCard

const Card = styled.a`
  background: #FFFFFF;
  box-shadow: 0px 4px 14px rgba(0, 0, 0, 0.06);
  border-radius: 16px;
  display: flex;
  align-items: flex-start;
  padding: 16px;
  transition: .1s;
  :hover {
    box-shadow: 0px 4px 14px rgba(0, 0, 0, 0.16);
  }
`

const CardImage = styled(Image)`
  border-radius: 16px;
  width: 100%;
  object-fit: cover;
`

const Content = styled.div`
  flex: 1;
  padding-left: 16px;
`

const Title = styled.h3`
  font-size: 20px;
  line-height: 32px;
  margin: 0 0 4px;
`

const Description = styled.p`
  font-family: Inter;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 24px;
  margin: 0 0 16px;
  opacity: 0.8;
`

const Address = styled.p`
  font-family: Inter;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 22px;
  opacity: 0.7;
  display: flex;
  align-items: center;
`

const MapIcon = styled(MapOutlinedIcon)`
  fill: #FF9E9E;
  width: 18px;
  margin-right: 10px;
  margin-top: -2px;
`
