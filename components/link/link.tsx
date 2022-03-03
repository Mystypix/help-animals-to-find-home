import Link from 'next/link'
import {StyledLink} from './link.styles'

export default ({ href, children }) => (
  <Link prefetch href={href} passHref>
    <StyledLink>{children}</StyledLink>
  </Link>
)