import React, { useState } from 'react'
import Button from '../../../components/common/Button'
import withAuth from '../../../components/common/AuthComponent'
import PageTitle from '../../../components/page-title'
import { useRouter } from 'next/router'
import Input from '../../../components/common/Input'
import { doc, setDoc } from 'firebase/firestore'
import { db } from '../../../firebase/firebase'
import { InputLabel } from '../../../components/common/input-label'
import SectionTitle from '../../../components/section-title'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import Image from '../../../components/common/Image'
import styled from '@emotion/styled'
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';

const EditPet = (props: any) => {
  const [dirty, setDirty] = useState(false)
  const storage = getStorage()
  const router = useRouter()
  const { id } = router.query
  const { userData } = props
  const petInfo = userData.pets?.find((pet: any) => pet.id === id)
  if (!petInfo) {
    router.push('/my-pets')
  }
  const [inputs, setInputs] = useState(petInfo)

  const handleInputChange = ({ target }: any) => {
    setInputs((state: any) => ({ ...state, [target.name]: target.value }))
    setDirty(true)
  }

  const handleUploadProfileImg = async ({ target }: any) => {
    if (target.files && target.files[0]) {
      const storageRef = ref(storage, `${id}-profileImg`)

      let img = target.files[0]

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
      const currentPets = userData.pets.filter((pet: any) => pet.id !== id)
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

  const handleRemove = async (e: any) => {
    const { userData } = props
    e.preventDefault()

    try {
      const usersRef = doc(db, 'users', userData.uid)
      const currentPets = userData.pets.filter((pet: any) => pet.id !== id)
      await setDoc(
        usersRef,
        {
          pets: [...currentPets],
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
        <StyledHeader>
            <PageTitle>
                <a
                onClick={() => router.push('/my-pets')}
                style={{ textDecoration: 'underline', cursor: 'pointer' }}
                >
                My Pets
                </a>
                / {inputs.name}
            </PageTitle>
            <Button color="secondary" onClick={handleRemove}>
                Remove Pet
            </Button>
        </StyledHeader>
      <StyledForm onSubmit={handleSubmit}>
        <div>
          <SectionTitle>Image</SectionTitle>
          {inputs.profileImg && (
            <StyledImageWrapper>
                <Image
                src={inputs.profileImg}
                width="336"
                height="252"
                objectFit="cover"
                alt="Profile Image"
                />
            </StyledImageWrapper>
          )}
          <label htmlFor="profile-image" style={{display: 'block', margin: '15px auto', textAlign: 'center'}}>
            <Input
              id="profile-image"
              name="profile-image"
              type="file"
              style={{opacity: 0, visibility: 'hidden', position: 'fixed', pointerEvents: 'none'}}
              onChange={handleUploadProfileImg}
            />
            <Button color="secondary">
              Upload button
            </Button>
          </label>
        </div>
        <div style={{marginLeft: '128px', flex: '1 1 auto'}}>
          <SectionTitle>General Info</SectionTitle>
          <InputLabel htmlFor="name">Pet Name</InputLabel>
          <Input
            name="name"
            onChange={handleInputChange}
            value={inputs.name}
            placeholder="Name"
          />
          <div style={{display: 'inline-block'}}>
            <InputLabel htmlFor="type">Animal Type</InputLabel>
            <Select
                labelId="type"
                id="type"
                value={inputs.type}
                label="Type"
                onChange={handleInputChange}
                name="type"
                style={{width: '200px', borderRadius: '30px', height: '39px', marginRight: '36px'}}
                >
                <MenuItem value={'dog'}>Dog</MenuItem>
                <MenuItem value={'cat'}>Cat</MenuItem>
                <MenuItem value={'rabbit'}>Rabbit</MenuItem>
                <MenuItem value={'other'}>Other</MenuItem>
            </Select>
          </div>
          <div style={{display: 'inline-block', marginBottom: '24px'}}>
            <InputLabel htmlFor="gender">Sex</InputLabel>
            <Select
                labelId="gender"
                id="gender"
                value={inputs.gender}
                label="gender"
                onChange={handleInputChange}
                name="gender"
                style={{width: '200px', borderRadius: '30px', height: '39px',}}
            >
                <MenuItem value={'male'}>Male</MenuItem>
                <MenuItem value={'female'}>Female</MenuItem>
            </Select>
          </div>
          <InputLabel htmlFor="age">Age</InputLabel>
          <Input name="age" onChange={handleInputChange} value={inputs.age} />
          <InputLabel htmlFor="size">Size</InputLabel>
          <Input name="size" onChange={handleInputChange} value={inputs.size} />
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
          />
          <Button type="submit" disabled={!dirty} style={{display: 'block', marginTop: '10px'}}>
            Save changes
          </Button>
        </div>
      </StyledForm>
    </div>
  )
}

export default withAuth(EditPet)

const StyledHeader = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
` 

const StyledForm = styled.form`
    display: flex;
    align-items: flex-start;
    max-width: 900px;
`

const StyledImageWrapper = styled.div`
  border-radius: 32px;
  overflow: hidden;
  height: 252;
`