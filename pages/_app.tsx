import '../styles/globals.css'
import 'swiper/css/bundle'
import React from 'react'
import Layout from '../components/layout/layout'
import type { AppProps } from 'next/app'
import { AuthUserProvider } from '../context/auth-user-context'

function MyApp({ Component, pageProps }: AppProps) {
  return <AuthUserProvider><Layout><Component {...pageProps} /></Layout></AuthUserProvider>
}

export default MyApp
