import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import ShelterListSection from '../components/sections/ShelterListSection'
import SlideBannerSection from '../components/sections/SlideBannerSection'
import NewestPetSection from '../components/sections/NewestPetSection'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Help animals to find home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <SlideBannerSection />
        <ShelterListSection />
        <NewestPetSection />
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <img src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}

export default Home
