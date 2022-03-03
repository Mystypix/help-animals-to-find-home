import Input from "../components/common/Input"
import Button from "../components/common/Button"
import { useState, forwardRef } from "react"
import { doc, setDoc } from "firebase/firestore"
import { db } from '../firebase/firebase'
import withAuth from '../components/common/AuthComponent'
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
  ) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  

const ShelterSetting = (props: any) => {
    const [inputs , setInputs] = useState({
        name: '',
        address: '',
        phone: '',
        email: '',
        description: '',
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
        const {userData} = props
        e.preventDefault()
        const {name, address, phone, email, description} = inputs

        try {
            const ref = doc(db, 'users', userData.uid)
            await setDoc(ref, {
                name,
                address,
                phone,
                email,
                description,
            }, {merge: true})
          
            setDirty(false)
            setSnackBarOpen(true)
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <Input name='name' onChange={handleInputChange} value={inputs.name} placeholder="Name" />
                <Input name='address' onChange={handleInputChange} value={inputs.address} placeholder="Address" />
                <Input name='phone' onChange={handleInputChange} value={inputs.phone} placeholder="Phone" />
                <Input name='email' onChange={handleInputChange} value={inputs.email} placeholder="Email" />
                <Input name='description' onChange={handleInputChange} value={inputs.description} placeholder="Description" />
                <Button type="submit" disabled={!dirty}>Save</Button>
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
