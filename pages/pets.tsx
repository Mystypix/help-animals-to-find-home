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
import styled from '@emotion/styled'

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
        const types = filters.types.includes(type) ? filters.types.filter((el: any) => el !== type) : [...filters.types, type]
        setFilters({...filters, types})
    }
    const setGenders = (gender: string) => {
        const genders = filters.genders.includes(gender) ? filters.genders.filter((el: any) => el !== gender) : [...filters.genders, gender]
        setFilters({...filters, genders})
    }

    return (
        <div>
            <PageTitle>Pets</PageTitle>
            <StyledFilterWrapper>
                <StyledFilterType>
                    <StyledFilterTitle>Animal</StyledFilterTitle>
                    <Stack spacing={2} direction="row">
                        <Button style={{borderRadius: '30px', color: filters.types.includes('dog') ? "white" : "var(--color-text)"}} variant={filters.types.includes('dog') ? "contained" : "outlined"} onClick={() => setFiltersType('dog')}>Dog</Button>
                        <Button style={{borderRadius: '30px', color: filters.types.includes('cat') ? "white" : "var(--color-text)"}} variant={filters.types.includes('cat') ? "contained" : "outlined"} onClick={() => setFiltersType('cat')}>Cat</Button>
                        <Button style={{borderRadius: '30px', color: filters.types.includes('rabbit') ? "white" : "var(--color-text)"}} variant={filters.types.includes('rabbit') ? "contained" : "outlined"} onClick={() => setFiltersType('rabbit')}>Rabbit</Button>
                        <Button style={{borderRadius: '30px', color: filters.types.includes('other') ? "white" : "var(--color-text)"}} variant={filters.types.includes('other') ? "contained" : "outlined"} onClick={() => setFiltersType('other')}>Other</Button>
                    </Stack>
                </StyledFilterType>
                <StyledFilterType>
                    <StyledFilterTitle>Gender</StyledFilterTitle>
                    <Stack spacing={2} direction="row">
                        <Button style={{borderRadius: '30px', color: filters.genders.includes('male') ? "white" : "var(--color-text)"}} variant={filters.genders.includes('male') ? "contained" : "outlined"} onClick={() => setGenders('male')}>Male</Button>
                        <Button style={{borderRadius: '30px', color: filters.genders.includes('female') ? "white" : "var(--color-text)"}} variant={filters.genders.includes('female') ? "contained" : "outlined"} onClick={() => setGenders('female')}>Female</Button>
                    </Stack>
                </StyledFilterType>
            </StyledFilterWrapper>
            <Grid spacing={2}>
                {pets.map((pet: any) => {
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

const StyledFilterWrapper = styled.div`
    display: flex;
    align-items: flex-start;
    margin-bottom: 32px;
`

const StyledFilterType = styled.div`
    margin-right: 32px;
`

const StyledFilterTitle = styled.div`
    margin-bottom: 6px;
    text-transform: uppercase;
    font-size: 12px;
    font-weight: 500;
    opacity: .7;
`