import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore'
import { createContext, useContext } from 'react'
import useFirebaseAuth from '../firebase/auth'
import { db } from '../firebase/firebase'

const AuthUserContext = createContext<any>({
  authUser: null,
  loading: true,
  signInWithGoogle: async () => {},
  signOut: async () => {},
})

export function AuthUserProvider({ children }: any) {
  const auth = useFirebaseAuth()
  return (
    <AuthUserContext.Provider value={auth}>{children}</AuthUserContext.Provider>
  )
}

// custom hook to use the authUserContext and access authUser and loading
export const useAuth = () => useContext(AuthUserContext)

export const getDBUser = async (user: any) => {
  if (!user) return null
  const docRef = doc(db, 'users', user.uid);
  const docSnap = await getDoc(docRef)
  return docSnap.exists() ? docSnap.data() : {}
}
