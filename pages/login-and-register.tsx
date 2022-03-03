import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useAuth } from '../context/auth-user-context'
import { useRouter } from 'next/router'
import { db } from '../firebase/firebase'
import { doc, setDoc } from "firebase/firestore"
import { collection, query, where, getDocs } from "firebase/firestore";

const LoginAndRegister: NextPage = () => {   
  const { authUser, loading, signInWithGoogle } = useAuth()
  const router = useRouter()

  const getDBUser = async (user: any) => {
    const q = query(collection(db, 'users'), where("id", "==", user.uid))

    const querySnapshot = await getDocs(q);
    return querySnapshot.empty ? null : querySnapshot.docs[0].data()
  }

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
        });
      }
      router.push('/shelter-settings');
    })
    .catch(error => {
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
          type: 'individual',
        });
      }
      router.push('/individual-settings');
    })
    .catch(error => {
      console.error(error)
    })
  }

  const handleLogin = () => {
    signInWithGoogle()
    .then(async (authUser: any) => {
      const user = authUser.user
      const dbUser = await getDBUser(user)
      if (!dbUser) {
        const ref = doc(db, 'users', user.uid)
        setDoc(ref, {
          id: user.uid,
          email: user.email,
          type: 'individual',
          photo: user.photoURL
        });
      }
    })
    .catch(error => {
      console.error(error)
    })
  }
  
  return (
    <div className={styles.container}>
      <Head>
        <title>Help animals to find home - registration</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {loading && <div>loading...</div>}
      {!authUser && (
        <div>
          <button onClick={handleLogin}>Login</button>
          <button onClick={handleRegisterShelter}>Register as a shelter</button>
          <button onClick={handleRegisterIndividual}>Register as an individual</button>
        </div>
      )}
    </div>
  )
}

export default LoginAndRegister
