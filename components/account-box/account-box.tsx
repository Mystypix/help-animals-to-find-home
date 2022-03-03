import Link from "next/link"
import Button from "../common/Button"
import { useAuth } from '../../context/auth-user-context'
import { useState } from "react"
import { StyledWrapper, StyledAvatar, StyledAccountPopUp } from "./account-box.styles"

const AccountBox = () => {
    const { authUser, signOut } = useAuth()
    const [open, setOpen] = useState(false)

    return (
        <StyledWrapper>
            <StyledAvatar onClick={() => setOpen(!open)} src={authUser.userPhoto} width='35px' height='35px' />
            {open && (
                <StyledAccountPopUp>
                    <Link href='/settings'>Settings</Link>
                    <Button onClick={signOut}>Logout</Button>
                </StyledAccountPopUp>
            )}
        </StyledWrapper>
    )
}

export default AccountBox