import Input from '../../components/common/Input'
import Button from '../../components/common/Button'
import { useState, forwardRef } from 'react'
import { doc, setDoc } from 'firebase/firestore'
import { db } from '../../firebase/firebase'
import withAuth from '../../components/common/AuthComponent'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert, { AlertProps } from '@mui/material/Alert'
import { InputLabel } from '../../components/common/input-label'
import SectionTitle from '../../components/section-title'
import PageTitle from '../../components/page-title'
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage'
import Image from '../../components/common/Image'
import React from 'react'
import styled from '@emotion/styled'

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

const ShelterSetting = (props: any) => {
  const { userData } = props
  const [inputs, setInputs] = useState({
    name: userData.name || '',
    address: userData.address || '',
    phone: userData.phone || '',
    website: userData.website || '',
    email: userData.email || '',
    description: userData.description || '',
    image: userData.shelterImg,
  })
  const [dirty, setDirty] = useState(false)
  const [snackBarOpen, setSnackBarOpen] = useState(false)
  const storage = getStorage()

  const handleCloseSnackBar = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return
    }

    setSnackBarOpen(false)
  }

  const handleInputChange = ({ target }: any) => {
    setInputs((state) => ({ ...state, [target.name]: target.value }))
    setDirty(true)
  }

  const uploadImageFile = () => {
    const upload = document.getElementById('shelter-image')
    upload?.click()
  }

  const handleImageUpload = async (e: any) => {
    if (e.currentTarget.files && e.currentTarget.files[0]) {
      const storageRef = ref(storage, `${userData.id}-shelter`)

      let img = e.currentTarget.files[0]

      uploadBytes(storageRef, img).then(async (snapshot) => {
        setSnackBarOpen(true)
        setInputs({
          ...inputs,
          image: await getDownloadURL(ref(storage, `${userData.id}-shelter`)),
        })
      })
    }
  }

  const handleSubmit = async (e: any) => {
    let coordinates
    const { userData } = props
    e.preventDefault()
    const { name, address, phone, email, description, website } = inputs
    if (address) {
      const geocoding = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURI(
          address
        )}.json?access_token=`
      ).then((response) => response.json())
      coordinates = geocoding.features ? geocoding.features[0].center : []
    }

    try {
      const usersRef = doc(db, 'users', userData.uid)
      await setDoc(
        usersRef,
        {
          name,
          address,
          phone,
          email,
          description,
          website,
          ...(coordinates.length ? { coordinates } : {}),
        },
        { merge: true }
      )

      setDirty(false)
      setSnackBarOpen(true)
    } catch (e) {
      console.error('Error adding document: ', e)
    }
  }

  return (
    <div>
      <PageTitle>Shelter Settings</PageTitle>
      <StyledForm onSubmit={handleSubmit}>
        <StyledImageUpload>
          <SectionTitle>Image</SectionTitle>
          {inputs.image && (
            <StyledImage
              src={inputs.image}
              width="335"
              height="250"
              alt="Animal image"
            />
          )}
          <input
            id="shelter-image"
            name="shelter-image"
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={handleImageUpload}
          />
          <StyledButtonContainer style={{ justifyContent: 'center' }}>
            <Button
              color="secondary"
              style={{ filter: 'grayscale(80%) brightness(1.15)' }}
              onClick={uploadImageFile}
            >
              Upload image
            </Button>
          </StyledButtonContainer>
        </StyledImageUpload>
        <StyledGeneralInfo>
          <SectionTitle>General</SectionTitle>
          <InputLabel htmlFor="name">Shelter name</InputLabel>
          <Input
            name="name"
            onChange={handleInputChange}
            value={inputs.name}
            placeholder="Name"
          />
          <InputLabel htmlFor="name">Shelter description</InputLabel>
          <Input
            name="description"
            onChange={handleInputChange}
            value={inputs.description}
            placeholder="Description"
            minRows={3}
            multiline
          />
          <InputLabel htmlFor="name">Address</InputLabel>
          <Input
            name="address"
            onChange={handleInputChange}
            value={inputs.address}
            placeholder="Address"
            style={{ marginBottom: 64 }}
          />
          <SectionTitle>Contact</SectionTitle>
          <InputLabel htmlFor="name">Email</InputLabel>
          <Input
            name="email"
            onChange={handleInputChange}
            value={inputs.email}
          />
          <InputLabel htmlFor="name">Phone</InputLabel>
          <Input
            name="phone"
            onChange={handleInputChange}
            value={inputs.phone}
          />
          <InputLabel htmlFor="name">Website</InputLabel>
          <Input
            name="website"
            onChange={handleInputChange}
            value={inputs.website}
          />
          <StyledButtonContainer>
            <Button type="submit" disabled={!dirty}>
              Save changes
            </Button>
          </StyledButtonContainer>
        </StyledGeneralInfo>
      </StyledForm>
      <Snackbar
        open={snackBarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackBar}
      >
        <Alert
          onClose={handleCloseSnackBar}
          severity="success"
          sx={{ width: '100%' }}
        >
          Action Sucessfull!
        </Alert>
      </Snackbar>
    </div>
  )
}

export default withAuth(ShelterSetting)

const StyledForm = styled.form`
  display: flex;
  justify-content: space-between;
  max-width: 900px;
`

const StyledImage = styled(Image)`
  border-radius: 18px; ;
`

const StyledImageUpload = styled.div`
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
