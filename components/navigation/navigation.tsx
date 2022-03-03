import Link from '../link'
import {StyledNavigation} from './navigation.styles'
import { useAuth } from '../../context/auth-user-context'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const Navigation = () => {
    const { authUser, loading, signOut } = useAuth()
    const router = useRouter()

    // Listen for changes on loading and authUser, redirect if needed
    // useEffect(() => {
    //     if (!loading && !authUser) router.push('/')
    // }, [authUser, loading])

    return (
        <StyledNavigation>
            <Link href='/'>Logo</Link>
            <div style={{flex: '1 1 auto'}} />
            <Link href='/map'>Map</Link>
            <Link href='/shelters'>Shelters</Link>
            <Link href='/pets'>Pets</Link>
            {!authUser && <Link href='/login-and-register'>Login/Register</Link>}
            {authUser && <button onClick={signOut}>Log out</button>}
        </StyledNavigation>
    )
}

export default Navigation