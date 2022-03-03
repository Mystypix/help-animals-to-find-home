import Link from "next/link"
import Button from "../common/Button"
import { useAuth } from '../../context/auth-user-context'
import { useState } from "react"
import { StyledWrapper, StyledAvatar, StyledAccountPopUp } from "./account-box.styles"
import { db } from '../../firebase/firebase'
import { collection, query, where, getDocs } from "firebase/firestore"
import React from 'react'

const AccountBox = () => {
    const { authUser, signOut }: any = useAuth()
    const [open, setOpen] = useState(false)

    const getDBUser = async (user: any) => {
        if (!user) return null
        const q = query(collection(db, 'users'), where("id", "==", user.uid))

        const querySnapshot = await getDocs(q);
        return querySnapshot.empty ? {} : querySnapshot.docs[0].data()
    }
    
    const user = getDBUser(authUser) as any

    return (
        <StyledWrapper>
            <StyledAvatar onClick={() => setOpen(!open)} src={authUser.userPhoto} width='35px' height='35px' />
            {open && (
                <StyledAccountPopUp onClick={() => setOpen(false)}>
                    <Link href={user.type === 'individual' ? '/individual-settings'  : '/shelter-settings'}>Settings</Link>
                    <Link href='/my-pets'>My Pets</Link>
                    <Button onClick={signOut}>Logout</Button>
                </StyledAccountPopUp>
            )}
        </StyledWrapper>
    )
}

export default AccountBox