import React, {useState, useEffect} from 'react'
import withAuth from '../../../../components/common/AuthComponent'
import PageTitle from '../../../../components/page-title'
import { useRouter } from 'next/router'
import SectionTitle from '../../../../components/section-title'
import Image from '../../../../components/common/Image'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { getFirestore, collection } from 'firebase/firestore'
import LoadingPage from '../../../../components/common/LoadingPage'
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage'
import styled from '@emotion/styled'

const Detail = (props: any) => {
  const router = useRouter()
  const { id } = router.query
  const [shelterImg, setShelterImg] = useState('')
  const [users, loading, error] = useCollectionData(
    collection(getFirestore(), 'users')
  )

  useEffect(() => {
    const getShelterImg = async () => {
      const {userData} = props
      const storage = getStorage()
      const imgRef = ref(storage, `${userData.uid}-shelter`)
      try {
        const imgUrl = await getDownloadURL(imgRef)
        setShelterImg(imgUrl)
      } catch (err: any) {
        if (err.code === 'storage/object-not-found') {
          setShelterImg(await getDownloadURL(ref(storage, `default-shelter`)))
        }
      }
    }
    if (!loading) {
      getShelterImg()
    }
  }, [loading])

  if (loading) {
    return <LoadingPage />
  }

  const petInfo = users ? users.map((user): any => {
      if (user.pets) {
          const pet = user.pets.find((pet: any) => pet.id === id)
          if (pet) {
            return {...pet, ...{userInfo: user}}
          }
        }
        return null
  }).filter(Boolean)[0] : undefined

  if (!petInfo) {
    router.push('/pets')
    return <LoadingPage /> 
  }

  return (
    <div>
      <PageTitle>
        <a
          onClick={() => router.push('/pets')}
          style={{ textDecoration: 'underline', cursor: 'pointer' }}
        >
          Pets
        </a>
        / {petInfo.name}
      </PageTitle>
      <StyledWrapper>
        <StyledImageWrapper>
          <Image
            src={petInfo.profileImg}
            width="336"
            height="252"
            alt="Profile Image"
          />
        </StyledImageWrapper>
        <StyledInfo>
          <div>
            <SectionTitle>General</SectionTitle>
            <StyledItem>
              <strong>Name:</strong> {petInfo.name}
            </StyledItem>
            <StyledItem>
              <strong>Gender:</strong> {petInfo.gender}
            </StyledItem>
            <StyledItem>
              <strong>Age:</strong> {petInfo.age}
            </StyledItem>
            <StyledItem>
              <strong>Breed:</strong> {petInfo.breed}
            </StyledItem>
            <StyledItem>
              <strong>Size:</strong> {petInfo.size}
            </StyledItem>
            <StyledDescription>
              {petInfo.description}
            </StyledDescription>
          </div>
          {petInfo.userInfo?.type === 'shelter' && (
              <div>
                <SectionTitle>Contact on Shelter</SectionTitle>
                <StyledShelterImageWrapper>
                  <Image
                    src={shelterImg || '/images/placeholder.svg'}
                    width="170"
                    height="128"
                    alt="Profile Image"
                  />
                </StyledShelterImageWrapper>
                <StyledItem>
                  <strong>Shelter</strong> {petInfo.userInfo.name}
                </StyledItem>
                <StyledItem>
                  <strong>Email</strong> {petInfo.userInfo.email}
                </StyledItem>
                <StyledItem>
                  <strong>Phone</strong> {petInfo.userInfo.phone}
                </StyledItem>
                <StyledItem>
                  <strong>Website</strong> {petInfo.userInfo.website}
                </StyledItem>
                <StyledItem>
                  <strong>Address</strong> {petInfo.userInfo.address}
                </StyledItem>
                <StyledDescription>
                  {petInfo.userInfo.description}
                </StyledDescription>
            </div>
          )}
          {petInfo.userInfo?.type !== 'shelter' && (
            <div>
                <SectionTitle>Contact Info</SectionTitle>
                <StyledItem>
                  <strong>Name</strong> {petInfo.userInfo.name}
                </StyledItem>
                <StyledItem>
                  <strong>Email</strong> {petInfo.userInfo.email}
                </StyledItem>
            </div>
          )}
        </StyledInfo>
      </StyledWrapper>
    </div>
  )
}

export default withAuth(Detail)

const StyledWrapper = styled.div`
  display: flex;
  align-items: flex-start;
`

const StyledInfo = styled.div`
  margin-left: 128px;
`

const StyledItem = styled.div`
  margin-bottom: 6px;
`

const StyledDescription = styled.div`
  margin-top: 32px;
  margin-bottom: 48px;
`

const StyledImageWrapper = styled.div`
  border-radius: 32px;
  overflow: hidden;
  height: 252px;
`

const StyledShelterImageWrapper = styled.div`
  margin-bottom: 15px;
  border-radius: 32px;
  overflow: hidden;
  width: 170px;
  height: 128px;
`