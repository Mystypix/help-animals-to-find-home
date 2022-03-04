import React from 'react'
import Navigation from '../navigation'
import { StyledMain } from './layout.styles'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { Home, Platform } from '../layouts'
import { ThemeProvider } from '@mui/material'
import theme from './theme'

export interface ILayout {
  children: React.ReactNode
}

const Layout = ({ children }: ILayout) => {
  const router = useRouter()

  const Content = ({ children }: ILayout) => (
    <>
      {router.pathname === '/' ? (
        <Home>{children}</Home>
      ) : (
        <Platform>{children}</Platform>
      )}
    </>
  )

  return (
    <>
      <Head>
        <title>Pawfive</title>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <ThemeProvider theme={theme}>
        <StyledMain>
          <Navigation />
          <Content>{children}</Content>
        </StyledMain>
      </ThemeProvider>
    </>
  )
}

export default Layout
