import React, { ElementType } from 'react'
import { Typography, TypographyVariant } from '@mui/material'
import styled from 'styled-components'
import { isHTMLHeadingTag } from '../../utils/html'

interface IText {
  variant?: TypographyVariant
  component: ElementType
  style?: any
  children: React.ReactNode
}

const Text = ({ variant, component, style, children }: IText) => (
  <Container variant={variant} component={component} style={style}>
    {children}
  </Container>
)

export default Text

const Container = styled<ElementType>(Typography)`
  font-family: ${({ variant }) =>
    isHTMLHeadingTag(variant)
      ? 'var(--font-primary)'
      : 'var(--font-secondary)'};
  font-weight: ${({ variant }) => (isHTMLHeadingTag(variant) ? 500 : 400)};
  font-style: normal;
`
