import AccountBox from '../account-box'
import React from 'react'
import Link from '../link'
import { StyledLinkWrapper, StyledNavigation } from './navigation.styles'
import { useAuth } from '../../context/auth-user-context'
import { useRouter } from 'next/router'
import Image from '../common/Image'

const Navigation = () => {
  const { authUser, loading } = useAuth()
  const router = useRouter()

  // Listen for changes on loading and authUser, redirect if needed
  // useEffect(() => {
  //     if (!loading && !authUser) router.push('/')
  // }, [authUser, loading])

  return (
    <StyledNavigation>
      <Link href="/">
        <Image src="/images/logo.svg" width="131px" height="48px" alt="Logo" />
      </Link>
      <StyledLinkWrapper>
        <Link href="/pets">Pets</Link>
        <Link href="/shelters">Shelters</Link>
        <Link href="/map">Map</Link>
      </StyledLinkWrapper>
      {!authUser && <Link href="/login-and-register">Login/Register</Link>}
      {authUser && <AccountBox />}
    </StyledNavigation>
  )
}

export default Navigation
