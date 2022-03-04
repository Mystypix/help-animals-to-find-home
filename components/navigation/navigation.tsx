import AccountBox from '../account-box'
import React from 'react'
import Link from '../link'
import { StyledLinkWrapper, StyledNavigation } from './navigation.styles'
import { useAuth } from '../../context/auth-user-context'
import { useRouter } from 'next/router'
import Image from '../common/Image'
import RegisterBox from '../register/RegisterBox'
import Button from '../common/Button'
import LoginButton from '../login/LoginButton'
import styled from '@emotion/styled'

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
        <Link href="/">Home</Link>
        <Link href="/pets">Pets</Link>
        <Link href="/shelters">Shelters</Link>
      </StyledLinkWrapper>
      {!authUser && (
        <StyledRegisterLogin>
          <RegisterBox />
          <LoginButton />
        </StyledRegisterLogin>
      )}
      {authUser && <AccountBox />}
    </StyledNavigation>
  )
}

export default Navigation

const StyledRegisterLogin = styled.div`
  display: flex;
`
