import { useState, useEffect } from 'react'
import { auth } from './firebase'
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth'

const provider = new GoogleAuthProvider()

const formatAuthUser = (user) => ({
  uid: user.uid,
  email: user.email,
  userPhoto: user.photoURL,
})

export default function useFirebaseAuth() {
  const [authUser, setAuthUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const authStateChanged = async (authState) => {
    if (!authState) {
      setAuthUser(null)
      setLoading(false)
      return
    }

    setLoading(true)
    var formattedUser = formatAuthUser(authState)
    setAuthUser(formattedUser)
    setLoading(false)
  }

  const clear = () => {
    setAuthUser(null)
    setLoading(true)
  }

  const signInWithGoogle = () =>
    signInWithPopup(auth, provider)

  const signOut = () =>
    auth.signOut().then(clear)

    // listen for Firebase state change
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(authStateChanged)
    return () => unsubscribe()
  }, [])

  return {
    authUser,
    loading,
    signInWithGoogle,
    signOut,
  }
}