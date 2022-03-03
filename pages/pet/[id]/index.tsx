import Button from '@mui/material/Button'
import withAuth from '../../../components/common/AuthComponent'
import PageTitle from "../../../components/page-title"
import { useRouter } from 'next/router'
import { useState } from "react"
import Input from "../../../components/common/Input"
import { doc, setDoc } from "firebase/firestore"
import { db } from '../../../firebase/firebase'
import {InputLabel} from '../../../components/common/input-label'
import SectionTitle from "../../../components/section-title"
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"
import React from 'react'
import { v4 as uuidv4 } from 'uuid';
import Image from '../../../components/common/Image'

const editPet = (props: any) => {
    const [dirty, setDirty] = useState(false)
    const storage = getStorage()
    const router = useRouter()
    const { id } = router.query
    const {userData} = props
    const petInfo = userData.pets?.find(((pet) => pet.id === id))
    if (!petInfo) {
        router.push('/my-pets')
    }
    const [inputs , setInputs] = useState(petInfo)

    const handleInputChange = ({target}: any) => {
        setInputs(state => ({...state, [target.name]: target.value}))
        setDirty(true)
    }

    const handleUploadProfileImg = async ({target}: any) => {
        if (target.files && target.files[0]) {
            const storageRef = ref(storage, `${id}-profileImg`);

            let img = target.files[0]

            uploadBytes(storageRef, img).then(async (snapshot) => {
                setInputs({...inputs, profileImg: await getDownloadURL(ref(storage, `${id}-profileImg`))})
            });
        }
    }

    const handleSubmit = async (e: any) => {
        const {userData} = props
        e.preventDefault()
        
        try {
            const usersRef = doc(db, 'users', userData.uid)
            const currentPets = userData.pets.filter((pet) => pet.id !== id)
            await setDoc(usersRef, {
                pets: [...currentPets, {...inputs, id: id}]
            }, {merge: true})
          
            router.push('/my-pets')
            setDirty(false)
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    const handleRemove = async (e: any) => {
        const {userData} = props
        e.preventDefault()
        
        try {
            const usersRef = doc(db, 'users', userData.uid)
            const currentPets = userData.pets.filter((pet) => pet.id !== id)
            await setDoc(usersRef, {
                pets: [...currentPets]
            }, {merge: true})
          
            router.push('/my-pets')
            setDirty(false)
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    return (
        <div>
            <PageTitle><a onClick={() => router.push('/my-pets')} style={{textDecoration: 'underline', cursor: 'pointer'}}>My Pets</a>/ Add New Pet</PageTitle>
            <Button color="secondary" variant="contained" onClick={handleRemove}>
                Remove Pet
            </Button>
            <form onSubmit={handleSubmit}>
                <div>
                    <SectionTitle>Image</SectionTitle>
                    {inputs.profileImg && <Image src={inputs.profileImg} width='500' height='400' alt='Profile Image' />}
                    <label htmlFor="profile-image">
                        <Input
                            id="profile-image"
                            name="profile-image"
                            type="file"
                            onChange={handleUploadProfileImg}
                        />
                        <Button color="secondary" variant="contained">
                            Upload button
                        </Button>
                    </label>
                </div>
                <div>
                    <SectionTitle>General Info</SectionTitle>
                    <InputLabel htmlFor="name">Pet Name</InputLabel>
                    <Input name='name' onChange={handleInputChange} value={inputs.name} placeholder="Name" />
                    <InputLabel htmlFor="type">Animal Type</InputLabel>
                    <Input name='type' onChange={handleInputChange} value={inputs.type} placeholder="type" />
                    <InputLabel htmlFor="gender">Gender</InputLabel>
                    <Input name='gender' onChange={handleInputChange} value={inputs.gender} placeholder="Gender" />
                    <InputLabel htmlFor="age">Age</InputLabel>
                    <Input name='age' onChange={handleInputChange} value={inputs.age} />
                    <InputLabel htmlFor="size">Size</InputLabel>
                    <Input name='size' onChange={handleInputChange} value={inputs.size} />
                    <InputLabel htmlFor="breed">Breed</InputLabel>
                    <Input name='breed' onChange={handleInputChange} value={inputs.breed} />
                    <InputLabel htmlFor="description">Description</InputLabel>
                    <Input name='description' onChange={handleInputChange} value={inputs.description} />
                    <Button type="submit" disabled={!dirty}>Save changes</Button>                    
                </div>
            </form>
        </div>
    )
}

export default withAuth(editPet)
