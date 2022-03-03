import Navigation from '../navigation'
import { StyledMain } from './layout.styles'

type LayoutPropsT = {
  children: React.ReactNode
}

const Layout = ({ children }: LayoutPropsT) => (
  <StyledMain>
    <Navigation />
    <body>{children}</body>
  </StyledMain>
)

export default Layout
