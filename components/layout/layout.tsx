import Navigation from '../navigation'
import React from 'react'
import { StyledMain } from './layout.styles'

type LayoutPropsT = {
  children: React.ReactNode
}

const Layout = ({ children }: LayoutPropsT) => (
  <StyledMain>
    <Navigation />
    <div>{children}</div>
  </StyledMain>
)

export default Layout
