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
      <SlideBannerSection />
      <ShelterListSection />
      <NewestPetSection />
    </div>
  )
}

export default Home
