import Button from '@mui/material/Button'
import withAuth from '../components/common/AuthComponent'
import PageTitle from "../components/page-title"
import Grid from '../components/common/Grid'
import Card from '../components/cards/PetCard'
import { useRouter } from 'next/router'
import React from 'react'

const ShelterSetting = (props: any) => {
    const {userData} = props
    const router = useRouter()
    
    const handleAddNewPet = () => {
        router.push('/pet/add')
    }

    const pets: Array<any> = userData.pets || []

    return (
        <div>
            <PageTitle>My Pets ({pets.length})</PageTitle>
            <Button variant="contained" onClick={handleAddNewPet}>
                Add new pet
            </Button>
            <Grid spacing={2}>
                {pets.map((pet) => {
                const { id, profileImg, name, breed } = pet
                const url = `/pet/${id}`
                return <Card image={profileImg} name={name} url={url} species={breed} key={id} alt={`card-${name}`} />
                })}
            </Grid>
        </div>
    )
}

export default withAuth(ShelterSetting)
