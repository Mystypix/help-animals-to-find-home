import Link from "next/link"
import Button from "../common/Button"
import { useAuth } from '../../context/auth-user-context'
import { useState } from "react"
import { StyledWrapper, StyledAvatar, StyledAccountPopUp } from "./account-box.styles"
import { db } from '../../firebase/firebase'
import { collection, query, where, getDocs } from "firebase/firestore";

const AccountBox = () => {
    const { authUser, signOut } = useAuth()
    const [open, setOpen] = useState(false)

    const getDBUser = async (user: any) => {
        if (!user) return null
        const q = query(collection(db, 'users'), where("id", "==", user.uid))

        const querySnapshot = await getDocs(q);
        return querySnapshot.empty ? {} : querySnapshot.docs[0].data()
    }
    
    const user = getDBUser(authUser)

    return (
        <StyledWrapper>
            <StyledAvatar onClick={() => setOpen(!open)} src={authUser.userPhoto} width='35px' height='35px' />
            {open && (
                <StyledAccountPopUp>
                    <Link href={user.type === 'individual' ? '/individual-settings'  : '/shelter-settings'}>Settings</Link>
                    <Button onClick={signOut}>Logout</Button>
                </StyledAccountPopUp>
            )}
        </StyledWrapper>
    )
}

export default AccountBox