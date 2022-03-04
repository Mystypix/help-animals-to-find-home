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
      const imgRef = ref(storage, `${userData.id}-shelter`)
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
            return {...pet, ...(user.type === 'shelter' && {userInfo: user})}
          }
        }
        return null
  }).filter(Boolean)[0] : undefined

  if (!petInfo) {
    router.push('/pets')
    return <LoadingPage /> 
  }

  console.log({petInfo, shelterImg})
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
        <div>
          <Image
            src={petInfo.profileImg}
            width="500"
            height="400"
            alt="Profile Image"
          />
        </div>
        <div>
          <SectionTitle>General</SectionTitle>
          <div>
            <strong>Name</strong> {petInfo.name}
          </div>
          <div>
            <strong>Gender</strong> {petInfo.gender}
          </div>
          <div>
            <strong>Age</strong> {petInfo.age}
          </div>
          <div>
            <strong>Breed</strong> {petInfo.breed}
          </div>
          <div>
            <strong>Size</strong> {petInfo.size}
          </div>
          <div>
            <strong>Description</strong> {petInfo.description}
          </div>
        </div>

        <div>
          <SectionTitle>Contact on Shelter</SectionTitle>
          <Image
            src={shelterImg}
            width="500"
            height="400"
            alt="Profile Image"
          />
          <div>
            <strong>Shelter</strong> {petInfo.userInfo.name}
          </div>
          <div>
            <strong>Email</strong> {petInfo.userInfo.email}
          </div>
          <div>
            <strong>Phone</strong> {petInfo.userInfo.phone}
          </div>
          <div>
            <strong>Website</strong> {petInfo.userInfo.website}
          </div>
          <div>
            <strong>Address</strong> {petInfo.userInfo.address}
          </div>
          <div>
            {petInfo.userInfo.description}
          </div>
        </div>
    </div>
  )
}

export default withAuth(Detail)
