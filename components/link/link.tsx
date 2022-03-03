import Link from 'next/link'
import {StyledLink} from './link.styles'
import React from 'react'

export default ({ href, children }: any) => (
  <Link href={href} passHref>
    <StyledLink>{children}</StyledLink>
  </Link>
)