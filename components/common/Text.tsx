import * as React from 'react'
import { Typography } from '@mui/material'

const Text = ({ variant, component, children }) => (
  <Typography variant={variant} component={component}>
    {children}
  </Typography>
)

export default Text
