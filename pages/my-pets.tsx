import Button from '../components/common/Button'
import withAuth from '../components/common/AuthComponent'
import PageTitle from "../components/page-title"
import Grid from '../components/common/Grid'
import Card from '../components/cards/PetCard'
import { useRouter } from 'next/router'
import React from 'react'
import styled from 'styled-components'

const MyPets = (props: any) => {
    const {userData} = props
    const router = useRouter()
    
    const handleAddNewPet = () => {
        router.push('/pet/add')
    }

    const pets: Array<any> = userData.pets || []

    return (
        <div>
            <StyledHeader>
                <PageTitle>My Pets ({pets.length})</PageTitle>
                <Button color='secondary' onClick={handleAddNewPet}>
                    Add new pet
                </Button>
            </StyledHeader>
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

export default withAuth(MyPets)

const StyledHeader = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
` 