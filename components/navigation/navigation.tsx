import AccountBox from '../account-box'
import Link from '../link'
import {StyledNavigation} from './navigation.styles'
import { useAuth } from '../../context/auth-user-context'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const Navigation = () => {
    const { authUser, loading } = useAuth()
    const router = useRouter()

    // Listen for changes on loading and authUser, redirect if needed
    // useEffect(() => {
    //     if (!loading && !authUser) router.push('/')
    // }, [authUser, loading])

    return (
        <StyledNavigation>
            <Link href='/pets'>Pets</Link>
            <Link href='/shelters'>Shelters</Link>
            <Link href='/map'>Map</Link>
            {!authUser && <Link href='/login-and-register'>Login/Register</Link>}
            {authUser && <AccountBox />}
        </StyledNavigation>
    )
}

export default Navigation