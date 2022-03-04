import React, {useState, useEffect} from 'react'
import { useRouter } from 'next/router'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { getFirestore, collection } from 'firebase/firestore'
import PageTitle from '../../components/page-title'
import styled from '@emotion/styled'
import Image from '../../components/common/Image'
import SectionTitle from '../../components/section-title'
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage'
import LoadingPage from '../../components/common/LoadingPage'

const ShelterDetail = () => {
    const router = useRouter()
    const { id } = router.query
    const [shelter, setShelter] = useState({
        name: '',
        address: '',
        email: '',
        phone: '',
        website: '',
        description: '',
    })
    const [shelterImage, setShelterImage] = useState('/images/placeholder.svg')


    const [users, loading, error] = useCollectionData(
        collection(getFirestore(), 'users')
    )

    useEffect(() => {
        const getShelter = async () => {
            const user: any = users?.find((user) => user.id === id)
            if (user) {
                setShelter({...shelter, ...user})
                getShelterImg()
            }
        }
        const getShelterImg = async () => {
          const storage = getStorage()
          const imgRef = ref(storage, `${id}-shelter`)
          try {
            const imgUrl = await getDownloadURL(imgRef)
            setShelterImage(imgUrl)
          } catch (err: any) {
            if (err.code === 'storage/object-not-found') {
              setShelterImage(await getDownloadURL(ref(storage, `default-shelter`)))
            }
          }
        }
        if (!loading) {
            getShelter()
        }
    }, [loading])

    if (loading) {
        return <LoadingPage />
    }

    return (
        <div>
            <PageTitle>
        <a
          onClick={() => router.push('/shelters')}
          style={{ textDecoration: 'underline', cursor: 'pointer' }}
        >
          Shelters
        </a>
        / {shelter.name}
      </PageTitle>
      <StyledWrapper>
        <StyledImageWrapper>
          <Image
            src={shelterImage}
            width="336"
            height="252"
            alt="Profile Image"
            objectFit='cover'
          />
        </StyledImageWrapper>
        <StyledInfo>
          <div>
            <SectionTitle>General</SectionTitle>
            <StyledItem>
              <strong>Name:</strong> {shelter.name}
            </StyledItem>
            <StyledItem>
              <strong>Address:</strong> {shelter.address}
            </StyledItem>
            <StyledDescription>
              {shelter.description}
            </StyledDescription>
          </div>
    
          <div>
            <SectionTitle>Contact</SectionTitle>
            <StyledItem>
              <strong>Email</strong> {shelter.email}
            </StyledItem>
            <StyledItem>
              <strong>Phone</strong> {shelter.phone}
            </StyledItem>
            <StyledItem>
              <strong>Website</strong> {shelter.website}
            </StyledItem>
            <StyledItem>
              <strong>Address</strong> {shelter.address}
            </StyledItem>
          </div>
        </StyledInfo>
      </StyledWrapper>
        </div>
    )
}

export default ShelterDetail

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
