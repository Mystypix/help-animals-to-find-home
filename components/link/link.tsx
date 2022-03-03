import NextLink from 'next/link'
import {StyledLink} from './link.styles'
import React from 'react'

const Link = ({ href, children }: any) => (
  <NextLink href={href} passHref>
    <StyledLink>{children}</StyledLink>
  </NextLink>
)

export default Link