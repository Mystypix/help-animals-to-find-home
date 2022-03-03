import type { NextPage } from 'next'
import { useState } from 'react'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Layout from '../components/layout'
import { signInWithGoogle } from '../firebase/firebase'

const LoginAndRegister: NextPage = () => {   
  const [user, setUser] = useState(null)
  
  const handleRegister = async () => {
    const userObj = await signInWithGoogle()

    if (userObj) {
      setUser(userObj)
    }
  }
  
  return (
    <div className={styles.container}>
      <Head>
        <title>Help animals to find home - registration</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        {!user && (
          <div>
            <button onClick={signInWithGoogle}>Login</button>
            <button onClick={handleRegister}>Register</button>
          </div>
        )}
        {user && (
          <form>
            <input placeholder='name' />
            <input placeholder='adress' />
            <input placeholder='identifier' />
          </form>
        )}
      </Layout>
    </div>
  )
}

export default LoginAndRegister
