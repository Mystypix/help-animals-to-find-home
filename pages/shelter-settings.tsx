import Input from "../components/common/Input"
import Button from "../components/common/Button"
import { useState } from "react"
import { addDoc, collection } from "firebase/firestore"
import { db } from '../firebase/firebase'

const ShelterSetting = () => {
    const [inputs, setInputs] = useState({})
    const [dirty, setDirty] = useState(false)

    const handleInputChange = ({target}: any) => {
       setInputs(state => ({...state, [target.name]: target.value}))
       setDirty(true)
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        const {name, address, phone, email} = inputs

        try {
            await addDoc(collection(db, "users"), {
                name,
                address,
                phone,
                email,
                type: 'shelter',
            })
          
            setDirty(false)
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
                <Button type="submit" disabled={!dirty}>Save</Button>
            </form>
        </div>
    )
}

export default ShelterSetting