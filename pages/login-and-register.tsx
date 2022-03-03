import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Layout from '../components/layout'
import { useAuth } from '../context/auth-user-context'
import { useRouter } from 'next/router'

const LoginAndRegister: NextPage = () => {   
  const { authUser, loading, signInWithGoogle } = useAuth()
  const router = useRouter()

  const handleRegisterShelter = () => {
    signInWithGoogle()
    .then(authUser => {
      router.push('/shelter-settings');
    })
    .catch(error => {
      console.error(error)
    })
  }

  const handleRegisterIndividual = () => {
    signInWithGoogle()
    .then(authUser => {
      router.push('/individual-settings');
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
      <Layout>
        {loading && <div>loading...</div>}
        {!authUser && (
          <div>
            <button onClick={signInWithGoogle}>Login</button>
            <button onClick={handleRegisterShelter}>Register as a shelter</button>
            <button onClick={handleRegisterIndividual}>Register as an individual</button>
          </div>
        )}
      </Layout>
    </div>
  )
}

export default LoginAndRegister
