import styled from '@emotion/styled'
import { doc, setDoc } from 'firebase/firestore'
import * as React from 'react'
import { getDBUser, useAuth } from '../../context/auth-user-context'
import { db } from '../../firebase/firebase'
import Button from '../common/Button'

const LoginButton = () => {
  const { signInWithGoogle } = useAuth()

  const handleLogin = () => {
    signInWithGoogle()
      .then(async (authUser: any) => {
        const user = authUser.user
        const dbUser = await getDBUser(user)
        if (!dbUser) {
          const ref = doc(db, 'users', user.uid)
          setDoc(ref, {
            id: user.uid,
            type: 'individual',
          })
        }
      })
      .catch((error: any) => {
        console.error(error)
      })
  }

  return (
    <>
      <Button
        color="secondary"
        style={{
          filter: 'grayscale(80%) brightness(1.15)',
          marginLeft: 24,
        }}
        onClick={handleLogin}
      >
        Login
      </Button>
    </>
  )
}

export default LoginButton
