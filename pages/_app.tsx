import '../styles/globals.css'
import 'swiper/css/bundle'
import type { AppProps } from 'next/app'
import App from '../components/template/App'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <App>
      <Component {...pageProps} />
    </App>
  )
}

export default MyApp
