import '../styles/globals.css'
import 'swiper/css/bundle'
import type { AppProps } from 'next/app'
import { AuthUserProvider } from '../context/auth-user-context'

function MyApp({ Component, pageProps }: AppProps) {
  return <AuthUserProvider><Component {...pageProps} /></AuthUserProvider>
}

export default MyApp
