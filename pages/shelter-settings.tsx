import Input from "../components/common/Input"
import Button from "../components/common/Button"
import { useState, forwardRef } from "react"
import { doc, setDoc } from "firebase/firestore"
import { db } from '../firebase/firebase'
import withAuth from '../components/common/AuthComponent'
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert'
import {InputLabel} from '../components/common/input-label'
import SectionTitle from "../components/section-title"
import PageTitle from "../components/page-title"

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
  ) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  

const ShelterSetting = (props: any) => {
    const {userData} = props
    const [inputs , setInputs] = useState({
        name: userData.name || '',
        address: userData.address || '',
        phone: userData.phone || '',
        website: userData.website || '',
        email: userData.email || '',
        description: userData.description || '',
    })
    const [dirty, setDirty] = useState(false)
    const [snackBarOpen, setSnackBarOpen] = useState(false);
    
    const handleCloseSnackBar = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setSnackBarOpen(false);
    }

    const handleInputChange = ({target}: any) => {
       setInputs(state => ({...state, [target.name]: target.value}))
       setDirty(true)
    }

    const handleSubmit = async (e: any) => {
        let coordinates
        const {userData} = props
        e.preventDefault()
        const {name, address, phone, email, description, website} = inputs
        if (address) {
            const geocoding = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURI(address)}.json?access_token=`).then((response) => response.json())
            coordinates = geocoding.features ? geocoding.features[0].center : []
        }
        
        try {
            const ref = doc(db, 'users', userData.uid)
            await setDoc(ref, {
                name,
                address,
                phone,
                email,
                description,
                website,
                ...(coordinates.length ? {coordinates} : {})
            }, {merge: true})
          
            setDirty(false)
            setSnackBarOpen(true)
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    return (
        <div>
            <PageTitle>Shelter Settings</PageTitle>

            <form onSubmit={handleSubmit}>
                <div>
                    <SectionTitle>Image</SectionTitle>
                </div>
                <div>
                    <SectionTitle>General</SectionTitle>
                    <InputLabel htmlFor="name">Shelter name</InputLabel>
                    <Input name='name' onChange={handleInputChange} value={inputs.name} placeholder="Name" />
                    <InputLabel htmlFor="name">Shelter description</InputLabel>
                    <Input name='description' onChange={handleInputChange} value={inputs.description} placeholder="Description" />
                    <InputLabel htmlFor="name">Shelter description</InputLabel>
                    <Input name='address' onChange={handleInputChange} value={inputs.address} placeholder="Address" />
                    <SectionTitle>Contact</SectionTitle>
                    <InputLabel htmlFor="name">Email</InputLabel>
                    <Input name='email' onChange={handleInputChange} value={inputs.email} />
                    <InputLabel htmlFor="name">Phone</InputLabel>
                    <Input name='phone' onChange={handleInputChange} value={inputs.phone} />
                    <InputLabel htmlFor="name">Website</InputLabel>
                    <Input name='website' onChange={handleInputChange} value={inputs.website} />
                    <Button type="submit" disabled={!dirty}>Save changes</Button>
                </div>
            </form>
            <Snackbar open={snackBarOpen} autoHideDuration={6000} onClose={handleCloseSnackBar}>
                <Alert onClose={handleCloseSnackBar} severity="success" sx={{ width: '100%' }}>
                Settings Saved!
                </Alert>
            </Snackbar>
        </div>
    )
}

export default withAuth(ShelterSetting)
