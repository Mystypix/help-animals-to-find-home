import * as React from 'react'
import { Link as MUILink } from '@mui/material'

const Link = ({ url, children }: { url: string; children: string }) => (
  <MUILink href={url}>{children}</MUILink>
)

export default Link
