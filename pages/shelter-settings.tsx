import Input from "../components/common/Input"
import Button from "../components/common/Button"
import { useState } from "react"
import { addDoc, collection } from "firebase/firestore"
import { db } from '../firebase/firebase'

const ShelterSetting = () => {
    const [inputs, setInputs] = useState({})

    const handleInputChange = ({target}: any) => {
       setInputs(state => ({...state, [target.name]: target.value}))
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        const {name, address, phone, email} = inputs

        console.log('wtf', db)

        try {
            const docRef = await addDoc(collection(db, "users"), {
                name,
                address,
                phone,
                email,
                type: 'shelter',
            });
          
            console.log("Document written with ID: ", docRef.id);
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
                <Button type="submit">Save</Button>
            </form>
        </div>
    )
}

export default ShelterSetting