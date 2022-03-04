import * as React from 'react'
import { Link as MUILink } from '@mui/material'

const Link = ({ href, children }: { href: string; children: string }) => (
  <MUILink href={href}>{children}</MUILink>
)

export default Link
