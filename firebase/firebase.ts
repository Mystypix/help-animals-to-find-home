import { initializeApp, getApps, getApp } from 'firebase/app'
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'

const provider = new GoogleAuthProvider();

const config = {
    apiKey: "AIzaSyBhJQfBbY6qrciyNsVUKdT53FDuZQopjEM",
    authDomain: "help-animals-to-find-home.firebaseapp.com",
    projectId: "help-animals-to-find-home",
    storageBucket: "help-animals-to-find-home.appspot.com",
    messagingSenderId: "709803263430",
    appId: "1:709803263430:web:6c8b450ac9028e2b3cdec7"
}

const app = !getApps().length ? initializeApp( config ) : getApp()

export const auth = getAuth(app)
export const signInWithGoogle = () => signInWithPopup(auth, provider)
  .then((result) => {
    return result.user
  }).catch((error) => {
    console.error('Something went wrong', error)
    return null
  })

export default app