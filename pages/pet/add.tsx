import Button from '../../components/common/Button'
import withAuth from '../../components/common/AuthComponent'
import PageTitle from '../../components/page-title'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import Input from '../../components/common/Input'
import { doc, setDoc } from 'firebase/firestore'
import { db } from '../../firebase/firebase'
import { InputLabel } from '../../components/common/input-label'
import SectionTitle from '../../components/section-title'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import React from 'react'
import { v4 as uuidv4 } from 'uuid'
import Image from '../../components/common/Image'
import styled from '@emotion/styled'

const AddPet = (props: any) => {
  const id = uuidv4()
  const storage = getStorage()
  const router = useRouter()
  const [dirty, setDirty] = useState(false)
  const [inputs, setInputs] = useState({
    name: '',
    type: '',
    gender: '',
    age: '',
    size: '',
    breed: '',
    description: '',
    profileImg: '',
  })

  useEffect(() => {
    const getImg = async () => {
      setInputs({
        ...inputs,
        profileImg: await getDownloadURL(ref(storage, `default-pet`)),
      })
    }
    getImg()
  }, [inputs, storage])

  const handleInputChange = ({ target }: any) => {
    setInputs((state) => ({ ...state, [target.name]: target.value }))
    setDirty(true)
  }

  const uploadPhotoFile = () => {
    const upload = document.getElementById('profile-image')
    upload?.click()
  }

  const handleUploadProfileImg = async (e: any) => {
    if (e.currentTarget.files && e.currentTarget.files[0]) {
      const storageRef = ref(storage, `${id}-profileImg`)

      let img = e.currentTarget.files[0]

      uploadBytes(storageRef, img).then(async (snapshot) => {
        setInputs({
          ...inputs,
          profileImg: await getDownloadURL(ref(storage, `${id}-profileImg`)),
        })
      })
    }
  }

  const handleSubmit = async (e: any) => {
    const { userData } = props
    e.preventDefault()

    try {
      const usersRef = doc(db, 'users', userData.uid)
      const currentPets = userData.pets || []
      await setDoc(
        usersRef,
        {
          pets: [...currentPets, { ...inputs, id: id }],
        },
        { merge: true }
      )

      router.push('/my-pets')
      setDirty(false)
    } catch (e) {
      console.error('Error adding document: ', e)
    }
  }

  return (
    <div>
      <PageTitle>
        <a
          onClick={() => router.push('/my-pets')}
          style={{ textDecoration: 'underline', cursor: 'pointer' }}
        >
          My Pets
        </a>
        / Add New Pet
      </PageTitle>
      <StyledForm onSubmit={handleSubmit}>
        <StyledPhotoUpload>
          <SectionTitle>Main Photo</SectionTitle>
          {inputs.profileImg && (
            <Image
              src={inputs.profileImg}
              width="335"
              height="250"
              alt="Profile Image"
            />
          )}
          <input
            id="profile-image"
            name="profile-image"
            type="file"
            accept="image/*"
            onChange={handleUploadProfileImg}
            style={{ display: 'none' }}
          />
          <StyledButtonContainer style={{ justifyContent: 'center' }}>
            <Button
              color="secondary"
              onClick={uploadPhotoFile}
              style={{ filter: 'grayscale(80%) brightness(1.15)' }}
            >
              Upload photo
            </Button>
          </StyledButtonContainer>
        </StyledPhotoUpload>
        <StyledGeneralInfo>
          <InputLabel htmlFor="name">Pet Name</InputLabel>
          <Input
            name="name"
            onChange={handleInputChange}
            value={inputs.name}
            placeholder="Name"
            fullWidth
          />
          <StyledRow>
            <div>
              <InputLabel htmlFor="type">Animal Species</InputLabel>
              <Input
                name="type"
                onChange={handleInputChange}
                value={inputs.type}
                placeholder="Dog, cat, rabbit..."
              />
            </div>
            <div>
              <InputLabel htmlFor="gender">Gender</InputLabel>
              <Input
                name="gender"
                onChange={handleInputChange}
                value={inputs.gender}
                placeholder="Gender"
              />
            </div>
          </StyledRow>
          <StyledRow>
            <div>
              <InputLabel htmlFor="age">Age</InputLabel>
              <Input
                name="age"
                onChange={handleInputChange}
                value={inputs.age}
              />
            </div>
            <div>
              <InputLabel htmlFor="size">Size</InputLabel>
              <Input
                name="size"
                onChange={handleInputChange}
                value={inputs.size}
              />
            </div>
          </StyledRow>

          <InputLabel htmlFor="breed">Breed</InputLabel>
          <Input
            name="breed"
            onChange={handleInputChange}
            value={inputs.breed}
          />
          <InputLabel htmlFor="description">Description</InputLabel>
          <Input
            name="description"
            onChange={handleInputChange}
            value={inputs.description}
            rows={3}
            multiline
          />
          <StyledButtonContainer>
            <Button type="submit" disabled={!dirty}>
              Add New Pet
            </Button>
          </StyledButtonContainer>
        </StyledGeneralInfo>
      </StyledForm>
    </div>
  )
}

export default withAuth(AddPet)

const StyledForm = styled.form`
  display: flex;
  justify-content: space-between;
  max-width: 900px;
`

const StyledPhotoUpload = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 0;
`

const StyledGeneralInfo = styled.div`
  flex-grow: 3;
  margin-left: 48px;
  display: flex;
  flex-direction: column;
`

const StyledButtonContainer = styled.div`
  display: flex;
  padding: 24px 0;
`

const StyledRow = styled.div`
  display: flex;
  justify-content: space-between;
  > * {
    :not(:last-child) {
      margin-right: 24px;
    }
  }
`
