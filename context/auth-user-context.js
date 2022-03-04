import { collection, getDocs, query, where } from 'firebase/firestore'
import { createContext, useContext } from 'react'
import useFirebaseAuth from '../firebase/auth'
import { db } from '../firebase/firebase'

const AuthUserContext = createContext({
  authUser: null,
  loading: true,
  signInWithGoogle: async () => {},
  signOut: async () => {},
})

export function AuthUserProvider({ children }) {
  const auth = useFirebaseAuth()
  return (
    <AuthUserContext.Provider value={auth}>{children}</AuthUserContext.Provider>
  )
}

// custom hook to use the authUserContext and access authUser and loading
export const useAuth = () => useContext(AuthUserContext)

export const getDBUser = async (user) => {
  if (!user) return null
  const q = query(collection(db, 'users'), where('id', '==', user.uid))

  const querySnapshot = await getDocs(q)
  const dbUser = querySnapshot.empty ? {} : querySnapshot.docs[0].data()
  return dbUser
}
