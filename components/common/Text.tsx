import React, { ElementType } from 'react'
import { Typography, TypographyVariant } from '@mui/material'

interface IText {
  variant: TypographyVariant
  component: ElementType
  style: any
  children: React.ReactNode
}

const Text = ({ variant, component, style, children }: IText) => (
  <Typography variant={variant} component={component} style={style}>
    {children}
  </Typography>
)

export default Text
