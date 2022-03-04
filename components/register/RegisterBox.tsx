import styled from '@emotion/styled'
import { ClickAwayListener } from '@mui/material'
import { doc, setDoc } from 'firebase/firestore'
import { useRouter } from 'next/router'
import * as React from 'react'
import { useState } from 'react'
import { getDBUser, useAuth } from '../../context/auth-user-context'
import { db } from '../../firebase/firebase'
import Button from '../common/Button'
import Menu from '../common/Menu'
import MenuItem from '../common/MenuItem'

const RegisterBox = () => {
  const [open, setOpen] = useState<boolean>()

  const { signInWithGoogle } = useAuth()
  const router = useRouter()

  const handleRegisterShelter = () => {
    signInWithGoogle()
      .then(async (authUser: any) => {
        const user = authUser.user
        const dbUser = await getDBUser(user)
        if (!dbUser) {
          const ref = doc(db, 'users', user.uid)
          setDoc(ref, {
            id: user.uid,
            type: 'shelter',
          })
        }
        router.push('/shelter/settings')
      })
      .catch((error: any) => {
        console.error(error)
      })
  }

  const handleRegisterIndividual = () => {
    signInWithGoogle()
      .then(async (authUser: any) => {
        const user = authUser.user
        const dbUser = await getDBUser(user)
        if (!dbUser) {
          const ref = doc(db, 'users', user.uid)
          await setDoc(ref, {
            id: user.uid,
            email: user.email,
            name: user.displayName,
            type: 'individual',
          })
        }
        router.push('/')
      })
      .catch((error: any) => {
        console.error(error)
      })
  }

  return (
    <StyledRegisterBox>
      <Button
        color="secondary"
        style={{ filter: 'grayscale(80%) brightness(1.15)' }}
        onClick={() => setOpen(!open)}
      >
        Register ▼
      </Button>
      {open && (
        <ClickAwayListener onClickAway={() => setOpen(false)}>
          <StyledPopUp onClick={() => setOpen(false)}>
            <Menu>
              <MenuItem onClick={handleRegisterShelter}>
                Register as a Shelter
              </MenuItem>
              <MenuItem onClick={handleRegisterIndividual}>
                Register as a Individual
              </MenuItem>
            </Menu>
          </StyledPopUp>
        </ClickAwayListener>
      )}
    </StyledRegisterBox>
  )
}

export default RegisterBox

const StyledRegisterBox = styled.div`
  position: relative;
`

const StyledPopUp = styled.div`
  position: absolute;
  top: 100%;
  z-index: 100;
  right: 0;
  transform: translateY(12px);
`
