import Button from '@mui/material/Button'
import withAuth from '../components/common/AuthComponent'
import PageTitle from "../components/page-title"
import Grid from '../components/common/Grid'
import Card from '../components/cards/PetCard'
import { useRouter } from 'next/router'
import React from 'react'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { getFirestore, collection } from 'firebase/firestore'

const Pets = (props: any) => {
    const {userData} = props
    const router = useRouter()
    
    const [users, loading, error] = useCollectionData(
        collection(getFirestore(), 'users')
    )

    const pets = users ? users.reduce((acc, user): any => {
        if (user.pets) {
            acc.push(...user.pets)
        }
        return acc
    }, []) : []

    return (
        <div>
            <PageTitle>Pets</PageTitle>
            <Grid spacing={2}>
                {pets.map((pet: any) => {
                    const { id, profileImg, name, breed } = pet
                    const url = `/pet/detail/${id}`
                    return <Card image={profileImg} name={name} url={url} species={breed} key={id} alt={`card-${name}`} />
                })}
            </Grid>
        </div>
    )
}

export default withAuth(Pets)
