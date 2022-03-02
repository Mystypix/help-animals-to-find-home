import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Layout from '../components/layout'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Help animals to find home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div>Some content</div>
      </Layout>
    </div>
  )
}

export default Home
