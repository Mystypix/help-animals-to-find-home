import Button from '@mui/material/Button'
import withAuth from '../components/common/AuthComponent'
import PageTitle from "../components/page-title"
import Grid from '../components/common/Grid'
import Card from '../components/cards/PetCard'
import { useRouter } from 'next/router'
import React, {useState, useEffect} from 'react'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { getFirestore, collection } from 'firebase/firestore'
import Stack from '@mui/material/Stack'

const Pets = (props: any) => {
    const {userData} = props
    const [filters, setFilters] = useState<any>({
        types: [],
        genders: [],
    })
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

    const setFiltersType = (type: string) => {
        const types = filters.types.includes(type) ? filters.types.filter((el) => el !== type) : [...filters.types, type]
        setFilters({...filters, types})
    }
    const setGenders = (gender: string) => {
        const genders = filters.genders.includes(gender) ? filters.genders.filter((el) => el !== gender) : [...filters.genders, gender]
        setFilters({...filters, genders})
    }
    console.log(filters)
    return (
        <div>
            <PageTitle>Pets</PageTitle>
            Animal Type
            <Stack spacing={2} direction="row">
                <Button variant={filters.types.includes('dog') ? "contained" : "outlined"} onClick={() => setFiltersType('dog')}>Dog</Button>
                <Button variant={filters.types.includes('cat') ? "contained" : "outlined"} onClick={() => setFiltersType('cat')}>Cat</Button>
                <Button variant={filters.types.includes('rabbit') ? "contained" : "outlined"} onClick={() => setFiltersType('rabbit')}>Rabbit</Button>
                <Button variant={filters.types.includes('other') ? "contained" : "outlined"} onClick={() => setFiltersType('other')}>Other</Button>
            </Stack>
            Gender
            <Stack spacing={2} direction="row">
                <Button variant={filters.genders.includes('male') ? "contained" : "outlined"} onClick={() => setGenders('male')}>Male</Button>
                <Button variant={filters.genders.includes('female') ? "contained" : "outlined"} onClick={() => setGenders('female')}>Female</Button>
            </Stack>
            <Grid spacing={2}>
                {pets.map((pet: any) => {
                    console.log({pet})
                    const { id, profileImg, name, breed, type, gender } = pet
                    const url = `/pet/detail/${id}`
                    if (filters.genders.includes(gender.toLowerCase()) || filters.genders.length === 0) {
                        if (filters.types.includes(type.toLowerCase()) || filters.types.length === 0) {
                            return <Card image={profileImg} name={name} url={url} species={breed} key={id} alt={`card-${name}`} />
                        }
                        return null
                    }
                    return null
                }).filter(Boolean)}
            </Grid>
        </div>
    )
}

export default withAuth(Pets)
